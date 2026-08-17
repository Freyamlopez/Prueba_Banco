package prueba.sistemaFacturacion.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth


                        .requestMatchers(
                                "/auth/**",
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html"
                        ).permitAll()
                        // --- Productos ---
                        .requestMatchers(HttpMethod.POST, "/productos/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/productos/**").hasRole("ADMIN")

                        // --- Clientes ---
                        .requestMatchers(HttpMethod.POST, "/clientes/**").hasAnyRole("ADMIN", "CAJERO")

                        // --- Facturas: creación y cambios de estado ---
                        .requestMatchers(HttpMethod.POST, "/facturas").hasRole("CAJERO")           // emitir factura: solo CAJERO
                        .requestMatchers(HttpMethod.PUT, "/facturas/*/pagar").hasRole("CAJERO")     // registrar pago: solo CAJERO
                        .requestMatchers(HttpMethod.PUT, "/facturas/*/anular").hasRole("ADMIN")     // anular factura: solo ADMIN

                        // --- Facturas: consultas ---
                        .requestMatchers(HttpMethod.GET, "/facturas").hasRole("ADMIN")              // historial completo: solo ADMIN (nuevo)
                        .requestMatchers(HttpMethod.GET, "/facturas/cliente/**").hasAnyRole("ADMIN", "CAJERO", "CLIENTE")
                        .requestMatchers(HttpMethod.GET, "/facturas/cajero/**").hasAnyRole("ADMIN", "CAJERO")
                        .requestMatchers(HttpMethod.GET, "/facturas/mis-facturas").hasAnyRole( "CAJERO")
                        .requestMatchers(HttpMethod.GET, "/facturas/cliente-facturas").hasRole("CLIENTE")


                        // Cualquier otro endpoint no listado arriba: solo requiere estar autenticado (cualquier rol)
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));

        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of("*"));

        configuration.setExposedHeaders(List.of("Authorization"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}