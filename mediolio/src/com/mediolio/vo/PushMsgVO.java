package com.mediolio.vo;

public class PushMsgVO {
	private int msg_id, msg_from;
	private String msg_text, msg_date, msg_from_nickname, msg_from_studentID;
	
	public String getMsg_from_nickname() {
		return msg_from_nickname;
	}
	public void setMsg_from_nickname(String msg_from_nickname) {
		this.msg_from_nickname = msg_from_nickname;
	}
	public int getMsg_id() {
		return msg_id;
	}
	public void setMsg_id(int msg_id) {
		this.msg_id = msg_id;
	}
	public int getMsg_from() {
		return msg_from;
	}
	public void setMsg_from(int msg_from) {
		this.msg_from = msg_from;
	}
	public String getMsg_text() {
		return msg_text;
	}
	public void setMsg_text(String msg_text) {
		this.msg_text = msg_text;
	}
	public String getMsg_date() {
		return msg_date;
	}
	public void setMsg_date(String msg_date) {
		this.msg_date = msg_date;
	}
	public String getMsg_from_studentID() {
		return msg_from_studentID;
	}
	public void setMsg_from_studentID(String msg_from_studentID) {
		this.msg_from_studentID = msg_from_studentID;
	}
	
	

}