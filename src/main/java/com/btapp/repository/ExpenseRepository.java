package com.btapp.repository;

import com.btapp.domain.Expense;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Expense entity.
 */
public interface ExpenseRepository extends JpaRepository<Expense,Long> {

}
