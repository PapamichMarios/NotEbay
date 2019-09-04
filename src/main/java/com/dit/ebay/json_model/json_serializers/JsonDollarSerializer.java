package com.dit.ebay.json_model.json_serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.DecimalFormat;

public class JsonDollarSerializer extends JsonSerializer<BigDecimal> {
    private final DecimalFormat dfExport = new DecimalFormat("#,###.00");

    @Override
    public void serialize(BigDecimal money, JsonGenerator jgen, SerializerProvider provider) throws IOException,
            JsonProcessingException {

        jgen.writeString("$" + dfExport.format(money));
    }
}
