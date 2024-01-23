package com.healthcare.www.product.repository;

import com.healthcare.www.product.domain.Product;
import com.healthcare.www.product.dto.ProductDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByProductNameIgnoreCaseContaining(String keyword);

    List<Product> findByProductTypeContaining(String keyword);

    List<Product> findByProductNo(Long aLong);
}
