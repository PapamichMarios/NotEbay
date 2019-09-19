package com.dit.ebay.controller;

import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.model.Image;
import com.dit.ebay.model.Item;
import com.dit.ebay.repository.ImageRepository;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.response.FileResponse;
import com.dit.ebay.security.CurrentUser;
import com.dit.ebay.security.UserDetailsImpl;
import com.dit.ebay.service.ImageService;
import org.apache.catalina.webresources.FileResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/app/items/{itemId}/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ImageRepository imageRepository;

    @GetMapping("/{imageId}")
    public ResponseEntity<?> getImage(@PathVariable(value = "itemId") Long itemId,
                             @PathVariable(value = "imageId") Long imageId) {
        return imageService.getImage(itemId, imageId);
    }

    @PostMapping("/multiUpload")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public Item multiUploadImages(@RequestParam("file") List<MultipartFile> files,
                                  @PathVariable(value = "itemId") Long itemId,
                                  @Valid @CurrentUser UserDetailsImpl currentUser) {
        return imageService.multiUploadImages(itemId, files, currentUser);
    }

}
