package com.dit.ebay.service;


import com.dit.ebay.StorageProperties;
import com.dit.ebay.exception.FileNotFoundException;
import com.dit.ebay.exception.StorageException;
import com.dit.ebay.model.Image;
import com.dit.ebay.model.Item;
import com.dit.ebay.repository.ImageRepository;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.util.ImageConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImageService {

    private final Path rootLocation;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    public ImageService(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
    }

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage location", e);
        }
    }

    public String store(MultipartFile file) {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file " + filename);
            }
            if (filename.contains("..")) {
                // This is a security check
                throw new StorageException(
                        "Cannot store file with relative path outside current directory "
                                + filename);
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, this.rootLocation.resolve(filename),
                        StandardCopyOption.REPLACE_EXISTING);
            }
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file " + filename, e);
        }

        return filename;
    }

    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new FileNotFoundException(
                        "Could not read file: " + filename);
            }
        }
        catch (MalformedURLException e) {
            throw new FileNotFoundException("Could not read file: " + filename, e);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = rootLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new FileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new FileNotFoundException("File not found " + fileName, ex);
        }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    public List<Resource> getImageResources(Item item) {
        List<Image> images = imageRepository.findByItemId(item.getId());
        List<Resource> imageResources = new ArrayList<>();
        for (Image image : images) {
            imageResources.add(loadFileAsResource(image.getPath()));
        }
        if (imageResources.isEmpty()) {
            imageResources.add(loadFileAsResource(ImageConstants.noImage));
        }
        return imageResources;
    }

    public List<Resource> getImageResourcesFirst(Item item) {
        List<Image> images = imageRepository.findByItemId(item.getId());
        List<Resource> imageResources = new ArrayList<>();
        if (!images.isEmpty()) {
            imageResources.add(loadFileAsResource(images.get(0).getPath()));
        }
        if (imageResources.isEmpty()) {
            imageResources.add(loadFileAsResource(ImageConstants.noImage));
        }
        return imageResources;
    }
}