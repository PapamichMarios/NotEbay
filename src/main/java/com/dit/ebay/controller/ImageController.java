package com.dit.ebay.controller;

import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.model.Image;
import com.dit.ebay.model.Item;
import com.dit.ebay.repository.ImageRepository;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.response.FileResponse;
import com.dit.ebay.service.ImageService;
import org.apache.catalina.webresources.FileResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@RestController
@RequestMapping("/app/items/{itemId}/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ImageRepository imageRepository;

    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable(value = "itemId") Long itemId,
                                                 @PathVariable(value = "fileName") String fileName) {
        Resource resource = imageService.loadAsResource(fileName);
        if (resource == null) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    //@PutMapping("/upload")
    @PutMapping(value = "/upload")
    public FileResponse uploadFile(@PathVariable(value = "itemId") Long itemId,
                                   @RequestParam("file") MultipartFile file) {
        String name = imageService.store(file);
        String uri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/")
                .path(name)
                .toUriString();
        return new FileResponse(name, uri, file.getContentType(), file.getSize());
    }

    @GetMapping("/{imageId}")
    public Resource getImage(@PathVariable(value = "itemId") Long itemId,
                            @PathVariable(value = "imageId") Long imageId) {

        return imageService.getImage(itemId, imageId);
    }
}
