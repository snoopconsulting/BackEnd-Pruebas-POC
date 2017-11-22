package com.api.Zanella.entities;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "moto_usuario")
public class MotoTitular implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_moto")
    private Long id;

    @Column(name = "n_motor")
    private String numEngine;

    @Column(name = "n_chasis")
    private String numChassis;

    @Column(name = "titular")
    private String holder;

    @Column(name = "patente")
    private String patent;

    @Column(name = "dni")
    private int idenDocument;

    @Column(name = "modelo_moto")
    private String motorcycleModel;

    @Column(name = "email")
    private String mail;


    public MotoTitular() {
    }

    public MotoTitular(String numEngine, String numChassis, String holder, String patent, int idenDocument, String motorcycleModel, String mail) {
        this.numEngine = numEngine;
        this.numChassis = numChassis;
        this.holder = holder;
        this.patent = patent;
        this.idenDocument = idenDocument;
        this.motorcycleModel = motorcycleModel;
        this.mail = mail;
    }

    public Long getId() {
        return id;
    }

    public String getNumEngine() {
        return numEngine;
    }

    public String getNumChassis() {
        return numChassis;
    }

    public String getHolder() {
        return holder;
    }

    public String getPatent() {
        return patent;
    }

    public int getIdenDocument() {
        return idenDocument;
    }

    public String getMotorcycleModel() {
        return motorcycleModel;
    }

    public String getMail() {
        return mail;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNumEngine(String numEngine) {
        this.numEngine = numEngine;
    }

    public void setNumChassis(String numChassis) {
        this.numChassis = numChassis;
    }

    public void setHolder(String holder) {
        this.holder = holder;
    }

    public void setPatent(String patent) {
        this.patent = patent;
    }

    public void setIdenDocument(int idenDocument) {
        this.idenDocument = idenDocument;
    }

    public void setMotorcycleModel(String motorcycleModel) {
        this.motorcycleModel = motorcycleModel;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    @Override
    public String toString() {
        return "MotoTitular{" +
                "id=" + id +
                ", numEngine='" + numEngine + '\'' +
                ", numChassis='" + numChassis + '\'' +
                ", holder='" + holder + '\'' +
                ", patent='" + patent + '\'' +
                ", idenDocument=" + idenDocument +
                ", motorcycleModel='" + motorcycleModel + '\'' +
                ", mail='" + mail + '\'' +
                '}';
    }
}
