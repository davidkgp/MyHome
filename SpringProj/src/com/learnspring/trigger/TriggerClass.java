package com.learnspring.trigger;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.learnspring.test.Message;
import com.learnspring.test.SeperateClass;

public class TriggerClass {

	public static void main(String[] args) {
		
		ApplicationContext context = null;
		try{
			context =
					new ClassPathXmlApplicationContext("Beans.xml");
			Message obj = (Message) context.getBean("myTest");
			SeperateClass SeperateClassobj = (SeperateClass) context.getBean("seperateObj");
			obj.getMessage();
            System.out.println(obj.getSeperateObj().getSeperateItem());
            System.out.println(SeperateClassobj.getSeperateItem());
            
            
            
		}catch(Exception excep){
			excep.printStackTrace();
		}finally{
			
		}
		
				

	}

}
