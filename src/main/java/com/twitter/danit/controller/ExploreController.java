package com.twitter.danit.controller;

import groovy.util.logging.Slf4j;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("${api.version}/explore")
@AllArgsConstructor
@Slf4j
public class ExploreController extends AbstractController {

}
