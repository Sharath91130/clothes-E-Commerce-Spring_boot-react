package com.kodnest.sales_backend.Repo;

import com.kodnest.sales_backend.Enitity.CartItem;
import com.kodnest.sales_backend.Enitity.Product;
import com.kodnest.sales_backend.Enitity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Integer> {

    Optional<CartItem> findByUserAndProduct(User user, Product product);

    @Query("SELECT c FROM CartItem c JOIN FETCH c.product p LEFT JOIN FETCH ProductImage pi ON p.productId = pi.product.productId WHERE c.user.userId = :userId")
    List<CartItem> findCartItemsWithProductDetails(int userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM CartItem c WHERE c.user.userId = :userId AND c.product.productId = :productId")
    void deleteCartItem(int userId, int productId);

    @Query("SELECT c FROM CartItem c WHERE c.user.userId = :userId AND c.product.productId = :productId")
    Optional<CartItem> findByUserAndProduct(@Param("userId") int userId, @Param("productId") int productId);
    @Query("SELECT SUM(c.quantity) FROM CartItem c WHERE c.user.userId = :userId")
    int countCartItemsByUserId(@Param("userId") int userId) ;
}