package com.mdstech.util;

import java.util.HashMap;
import java.util.Map;

public class StateManager {
	
	private Map<String, Map<String, Object>> stateData = new HashMap<String, Map<String,Object>>();
	
	public void saveData(String userid, String name, String value) {
	
		if(!stateData.containsKey(userid)) {
			stateData.put(userid, new HashMap<String, Object>());
		}
		stateData.get(userid).put(name, value);
	}
	
	public Map<String, Object> getUserData(String userId) {
		return stateData.get(userId);
	}
	
	public void clearData(String userId, String name) {
		if(name != null) {
			stateData.get(userId).remove(name);
		}
		else {
			stateData.remove(userId);
		}
	}
	
	public static StateManager getInstance() {
		return StateManagerHolder.STATE_MANAGER;
	}
	
	private static class StateManagerHolder {
		private static final StateManager STATE_MANAGER = new StateManager();
	}
}
