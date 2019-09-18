package com.dit.ebay.controller;

import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.model.Item;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.response.FileResponse;
import com.dit.ebay.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@RestController
@RequestMapping("/app/items/{itemId}/images")
public class FileController {

    @Autowired
    private ImageService imageService;

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable(value = "itemId") Long itemId,
                                                 @PathVariable(value = "fileName") String fileName) {
        //Item item = itemRepository.findById(itemId)
         //       .orElseThrow(() -> new ResourceNotFoundException("Item", "id", itemId));
        /*
        if (item.getImagePath() == null) {
            return ResponseEntity
                    .notFound()
                    .build();
        }*/
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

    @PutMapping("/upload")
    public FileResponse uploadFile(@PathVariable(value = "itemId") Long itemId,
                                   @RequestParam("image") MultipartFile file) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", itemId));
        String name = imageService.store(file);
       // item.setImagePath(name);
        itemRepository.save(item);
        String uri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/")
                .path(name)
                .toUriString();
        return new FileResponse(name, uri, file.getContentType(), file.getSize());
    }
}
