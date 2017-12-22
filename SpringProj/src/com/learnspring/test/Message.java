package com.learnspring.test;

public class Message {
	
	private String message;
	
	private SeperateClass seperateObj;

	/**
	 * @return the message
	 */
	public void getMessage() {
		System.out.println("Hello "+this.message);;
	}

	/**
	 * @param message the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 * @return the seperateObj
	 */
	public SeperateClass getSeperateObj() {
		return seperateObj;
	}

	/**
	 * @param seperateObj the seperateObj to set
	 */
	public void setSeperateObj(SeperateClass seperateObj) {
		this.seperateObj = seperateObj;
	}
	
	
	
	

}
