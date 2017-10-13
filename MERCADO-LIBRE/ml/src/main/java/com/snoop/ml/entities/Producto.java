package com.snoop.ml.entities;

import org.springframework.stereotype.Component;

@Component
public class Producto {

    private Long code;
    private String name;
    private String mark;
    private String description;
    private Double price;

    public Producto(){}

    public Long getCode() {
        return code;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Producto{" +
                "code=" + code +
                ", name='" + name + '\'' +
                ", mark='" + mark + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                '}';
    }
}
