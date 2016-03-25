package com.btapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Expense.
 */
@Entity
@Table(name = "expense")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "expense")
public class Expense implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "id_expense_type", nullable = false)
    private Integer id_expense_type;
    
    @NotNull
    @Column(name = "id_btr", nullable = false)
    private Integer id_btr;
    
    @NotNull
    @Column(name = "expense_cost", nullable = false)
    private Double expense_cost;
    
    @ManyToOne
    @JoinColumn(name = "btr_id")
    private Btr btr;

    @ManyToOne
    @JoinColumn(name = "expense_type_id")
    private Expense_type expense_type;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getId_expense_type() {
        return id_expense_type;
    }
    
    public void setId_expense_type(Integer id_expense_type) {
        this.id_expense_type = id_expense_type;
    }

    public Integer getId_btr() {
        return id_btr;
    }
    
    public void setId_btr(Integer id_btr) {
        this.id_btr = id_btr;
    }

    public Double getExpense_cost() {
        return expense_cost;
    }
    
    public void setExpense_cost(Double expense_cost) {
        this.expense_cost = expense_cost;
    }

    public Btr getBtr() {
        return btr;
    }

    public void setBtr(Btr btr) {
        this.btr = btr;
    }

    public Expense_type getExpense_type() {
        return expense_type;
    }

    public void setExpense_type(Expense_type expense_type) {
        this.expense_type = expense_type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Expense expense = (Expense) o;
        if(expense.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, expense.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Expense{" +
            "id=" + id +
            ", id_expense_type='" + id_expense_type + "'" +
            ", id_btr='" + id_btr + "'" +
            ", expense_cost='" + expense_cost + "'" +
            '}';
    }
}
