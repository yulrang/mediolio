package com.mediolio.mvc.model;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.mediolio.mvc.dao.HistoryDao;
import com.mediolio.mvc.dao.ProjectDao;
import com.mediolio.vo.BranchVO;
import com.mediolio.vo.ClassVO;
import com.mediolio.vo.HistoryVO;
import com.mediolio.vo.MemberVO;

@Controller
public class HistoryModel {
	@Autowired
	private HistoryDao htdao;
	@Autowired
	private ProjectDao pdao;
	
	@RequestMapping(value="addHistory")
	public String addHistory(HistoryVO htvo,HttpSession session){
		// 새로운 히스토리 추가
		htvo.setM_id(((MemberVO)session.getAttribute("mev")).getM_id());
		htdao.addHistory(htvo);
		return "redirect:gotoMyPage";
	}
	
	@RequestMapping(value="deleteHistory")
	public String deleteHistory(int ht_id){
		// 히스토리 삭제
		htdao.deleteHistory(ht_id);
		return "redirect:gotoMyPage";
	}
	
	@RequestMapping(value="addBranch")
	public String addBranch(BranchVO brvo, HttpSession session){
		// 히스토리에 브랜치 추가
		// 이미지 파일 업로드
		List<MultipartFile> imgFiles = brvo.getImgFiles();
		if(imgFiles != null & imgFiles.size()>0){
			for(int i=0; i<imgFiles.size(); i++){
				MultipartFile multipartFile = imgFiles.get(i);
				String fileName = multipartFile.getOriginalFilename();
				
				if(fileName != ""){
					String[] fileFullName = multipartFile.getOriginalFilename().split("\\.");
					String fName = fileFullName[0]; // 파일 이름
					String fileExt = fileFullName[1].toLowerCase(); // 파일 확장자
					String newFileName = fName+"_"+System.currentTimeMillis()+"."+fileExt;
					System.out.println("New File Name: "+newFileName); // 새로운 파일 이름(중복 방지)
				
					String realPath = session.getServletContext().getRealPath("/upload/"); // 업로드 경로
					StringBuffer path = new StringBuffer();
					path.append(realPath).append("history/").append(newFileName);
					System.out.println("File Upload Path: "+path);
					File file = new File(path.toString());
					file.mkdirs();
					try {
						multipartFile.transferTo(file); // 파일 업로드
						switch(i){
						// db에 저장할 이미지 파일 이름 VO 객체에 세팅
							case 0:
								brvo.setBr_img1(newFileName);
								break;
							case 1:
								brvo.setBr_img2(newFileName);
								break;
							case 2:
								brvo.setBr_img3(newFileName);
								break;
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		
		htdao.addBranch(brvo);
		htdao.updateLastEdit(brvo.getHt_id());
		return "redirect:gotoMyPage";
	}
	
	@RequestMapping(value="deleteBranch")
	public String deleteBranch(BranchVO brvo,String ht_title,Model model){
		// 브랜치 삭제
		htdao.deleteBranch(brvo.getBr_id());
		model.addAttribute("htId", brvo.getHt_id());
		model.addAttribute("htTitle", ht_title);
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("ht_id", String.valueOf(brvo.getHt_id()));
		map.put("type", "myPage");
		model.addAttribute("branchList", htdao.branchList(map));
		
		
		return "mypage.history";
	}
	
	@RequestMapping(value="historyDetail")
	public String historyDetail(HistoryVO htvo,String type,Model model){
		// 목록에서 히스토리 선택 시 그 히스토리의 브랜치 표시
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("ht_id", String.valueOf(htvo.getHt_id()));
		map.put("type", type);
		model.addAttribute("branchList", htdao.branchList(map));
		
		model.addAttribute("htId", htvo.getHt_id());
		model.addAttribute("htTitle", htvo.getHt_title());
		return "mypage.history";
	}
	
	@RequestMapping(value="autocompleteClass")
	public void autocompleteClass(String cl_name,HttpServletResponse response) throws IOException{
		// 관련 과목 입력 시 자동 완성
		List<ClassVO> classList = htdao.autocompleteClass(cl_name);
		int classNum = classList.size();
		int[] cl_ids = new int[classNum];
		String[] cl_names = new String[classNum];
		
		StringBuffer sb = new StringBuffer();
		sb.append("[");
		for(int i=0; i<classNum; i++){
			ClassVO cl = classList.get(i);
			cl_ids[i] = cl.getCl_id();
			cl_names[i] = cl.getCl_name();
			sb.append("\"");
			sb.append("<input type='hidden' class='classId' value="+cl_ids[i]+">");
			sb.append("<span class='className'>"+cl_names[i]+"</span>");
			sb.append("\"");
			if(i != classNum-1){
				sb.append(",");
			}
			
		}
		sb.append("]");
		
		PrintWriter pw = response.getWriter();
		pw.write(sb.toString());
		pw.flush();
		pw.close();
		
		
	}
	
	@RequestMapping(value="changeHtPublic")
	public String changeHtPublic(HistoryVO htvo,Model model,HttpSession session){
		// 히스토리 공개 상태 변경
		htdao.changeHtPublic(htvo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("m_id", String.valueOf(((MemberVO)(session.getAttribute("mev"))).getM_id()));
		map.put("type", "myPage");
		
		model.addAttribute("htList", htdao.historyList(map));
		return "mypage.historyList";
	}
	
	@RequestMapping(value="userHistory")
	public String userHistory(int m_id, Model model){
		// 유저(접속한 사용자 외의 회원)의 히스토리, 게시물(프로젝트,과제) 열람
		
		// 전체 히스토리 리스트
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("m_id", String.valueOf(m_id));
		map.put("type", "userPage");
		List<HistoryVO> htList = htdao.historyList(map);
		model.addAttribute("htList", htList);
		// 가장 최근에 업데이트 된 히스토리의 브랜치들 불러오기
		if(!htList.isEmpty()){
			HistoryVO recentHt = htList.get(0);
			model.addAttribute("recentHtId", recentHt.getHt_id());
			model.addAttribute("recentHtTitle", recentHt.getHt_title());
			
			Map<String, Object> map2 = new HashMap<String, Object>();
			map2.put("ht_id", String.valueOf(recentHt.getHt_id()));
			map2.put("type", "userPage");
			model.addAttribute("branches",htdao.branchList(map2));
		}
				
		// 유저의 게시물
		model.addAttribute("myProjects",pdao.userProject(m_id));
		model.addAttribute("type","userPage");
				
		return "mypage/mypage";
	}
}
