package com.mdstech.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mdstech.util.StateManager;

@Controller
@RequestMapping("/state/")
public class HttpStateManager {
	private static final String NAME_ATTR = "name";
	private static final String VALUE_ATTR = "value";

	@RequestMapping(value = "get", method = RequestMethod.GET)
	public @ResponseBody
	Map<String, Object> get(
			@RequestParam("userid") String userid,
			@RequestParam(value = HttpStateManager.NAME_ATTR, required = false) String componentId) {
		Map<String, Object> valueMap = new HashMap<String, Object>();
		valueMap.put("success", "true");
		if (StateManager.getInstance().getUserData(userid) != null) {
			Map<String, Object> data = StateManager.getInstance().getUserData(
					userid);
			if (data != null) {
				for (String key : data.keySet()) {
					valueMap.put(key, data.get(key));
				}
			}
		}
		System.out.print("Get---");
		System.out.println(valueMap);
		System.out.print("Get---End");
		return valueMap;
	}

	@RequestMapping(value = "save", method = RequestMethod.GET)
	public @ResponseBody
	Map<String, Object> save(
			@RequestParam("userid") String userid,
			@RequestParam(value = HttpStateManager.NAME_ATTR) String componentId,
			@RequestParam(value = HttpStateManager.VALUE_ATTR) String statedata) {
		Map<String, Object> valueMap = new HashMap<String, Object>();
		StateManager.getInstance().saveData(userid, componentId, statedata);
		valueMap.put("success", "true");
		System.out.print("Component---" + componentId + " ----- " + statedata);
		System.out.println(valueMap);
		System.out.print("Save---End");
		return valueMap;
	}
	
	@RequestMapping(value = "clear", method = RequestMethod.GET)
	public @ResponseBody
	Map<String, Object> clear(
			@RequestParam("userid") String userid,
			@RequestParam(value = HttpStateManager.NAME_ATTR) String componentId) {
		Map<String, Object> valueMap = new HashMap<String, Object>();
		StateManager.getInstance().clearData(userid, componentId);
		valueMap.put("success", "true");
		System.out.println(valueMap);
		System.out.print("Clear---End");
		return valueMap;
	}
}
