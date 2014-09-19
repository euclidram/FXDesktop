package com.mdstech.view;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

public class MappingJacksonJsonpView extends MappingJackson2JsonView {

	private static final String DEFAULT_CONTENT_VIEW = "application/javascript";
	private static final String JSONP_CALLBACK = "callback";
	
	@Override
	public String getContentType() { 
		return DEFAULT_CONTENT_TYPE;
	}
	
	@Override
	public void render(Map<String, ?> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		System.out.println("Received Requset..........." + request.getParameterMap());
		if(RequestMethod.GET.equals(request.getMethod().toUpperCase())) {
			Map<String, String[]> params = request.getParameterMap();
			
			if(params.containsKey(JSONP_CALLBACK)) {
				System.out.println("------------------"+params.get(JSONP_CALLBACK));
				response.getOutputStream().write(new String(params.get(JSONP_CALLBACK) + "(").getBytes());
				super.render(model, request, response);
				response.getOutputStream().write(new String(");").getBytes());
				response.setContentType(DEFAULT_CONTENT_VIEW);
			}
			else {
				super.render(model, request, response);
			}
		}
		else {
			super.render(model, request, response);
		}
	}
}
