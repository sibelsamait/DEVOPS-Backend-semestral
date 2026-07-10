package com.citt;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles; // Importa esto

@SpringBootTest
@ActiveProfiles("test")
class SpringbootApiRestApplicationTests {

    @Test
    void contextLoads() {
    }
}