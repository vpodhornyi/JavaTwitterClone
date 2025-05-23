package com.twitter.danit.controller;

import com.twitter.danit.dto.cloudinary.CloudinaryImageResponse;
import com.twitter.danit.service.CloudinaryService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(value = "${api.version}/cloud")
public class ImageController {
  private final CloudinaryService cloudinaryService;

  public ImageController(CloudinaryService cloudinaryService) {
    this.cloudinaryService = cloudinaryService;
  }

  @GetMapping(value = "/images")
  public ResponseEntity<List<String>> get(
      @RequestParam(value = "name", required = false) String name) {
    return ResponseEntity.ok(cloudinaryService.getImages(name));
  }

  @PostMapping(value = "/image")
  public ResponseEntity<String> post(@RequestParam MultipartFile uploadFile) {
    return ResponseEntity.ok(cloudinaryService.uploadImage(uploadFile));
  }

  @PostMapping(value = "/images")
  public ResponseEntity<CloudinaryImageResponse> saveImage(@RequestParam MultipartFile uploadFile) {
    String url = cloudinaryService.uploadImage(uploadFile);

    return ResponseEntity.ok(new CloudinaryImageResponse(url));
  }
}
