package com.dit.ebay.request;

import javax.validation.constraints.Size;
import java.math.BigDecimal;

public class SearchRequest {

    @Size(max = 80)
    private String name;

    private BigDecimal minM;

    private BigDecimal maxM;

    @Size(max = 60)
    private String cnt;

    @Size(max = 180)
    private String loc;

    @Size(max = 10000)
    private String descr;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getMinM() {
        return minM;
    }

    public void setMinM(BigDecimal minM) {
        this.minM = minM;
    }

    public BigDecimal getMaxM() {
        return maxM;
    }

    public void setMaxM(BigDecimal maxM) {
        this.maxM = maxM;
    }

    public String getCnt() {
        return cnt;
    }

    public void setCnt(String cnt) {
        this.cnt = cnt;
    }

    public String getLoc() {
        return loc;
    }

    public void setLoc(String loc) {
        this.loc = loc;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    @Override
    public String toString() {
        return "SearchRequest{" +
                "name='" + name + '\'' +
                ", minM=" + minM +
                ", maxM=" + maxM +
                ", cnt='" + cnt + '\'' +
                ", loc='" + loc + '\'' +
                ", descr='" + descr + '\'' +
                '}';
    }
}
