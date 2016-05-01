import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;

import java.io.*;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;

import static org.apache.commons.codec.binary.Hex.*;
import static org.junit.Assert.assertNotNull;

import org.apache.commons.codec.DecoderException;
import org.junit.Test;

public class KeyGen {

    @Test
    public void generateKey() throws NoSuchAlgorithmException
    {
        Key key = MacProvider.generateKey(SignatureAlgorithm.HS256);
        assertNotNull(String.valueOf(encodeHex(key.getEncoded())));
    }

    @Test
    public void loadKey() throws IOException
    {
        String data = "70bf97e437e17f70af9dbfde3fb90d6cf35531af139772696502d7921b987d60";
        byte[] encoded = null;
        try {
            encoded = decodeHex(data.toCharArray());
        } catch (DecoderException e) {
            e.printStackTrace();
        }
        assertNotNull(new SecretKeySpec(encoded, "HS256"));
    }
}
