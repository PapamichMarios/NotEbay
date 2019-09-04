package com.dit.ebay.json_model.json_serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

public class JsonDateDesializer extends JsonSerializer<Timestamp> {
    private SimpleDateFormat dateFormat = new SimpleDateFormat("MMM-dd-yy HH:mm:ss");

    @Override
    public void serialize(Timestamp v, JsonGenerator jgen, SerializerProvider provider) throws IOException,
            JsonProcessingException {

        jgen.writeString(dateFormat.format(v));
    }
}
