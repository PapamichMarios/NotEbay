package com.dit.ebay.service;

import com.dit.ebay.util.PaginationConstants;
import com.dit.ebay.exception.BadRequestException;

import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ValidatePageParametersService {

    private static final Logger logger = LoggerFactory.getLogger(ValidatePageParametersService.class);

    public void validate(int page, int size) {
        if (page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if (size > PaginationConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + PaginationConstants.MAX_PAGE_SIZE);
        }
    }
}
