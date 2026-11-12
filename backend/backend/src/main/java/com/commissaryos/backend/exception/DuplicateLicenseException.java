
package com.commissaryos.backend.exception;

public class DuplicateLicenseException
        extends RuntimeException {

    public DuplicateLicenseException(String message) {
        super(message);
    }
}
