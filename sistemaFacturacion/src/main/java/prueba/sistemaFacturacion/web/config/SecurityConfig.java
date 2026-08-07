package prueba.sistemaFacturacion.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
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


                            .requestMatchers("/auth/**", "/v3/api-docs/**", "/swagger-ui/**").permitAll()
                            .requestMatchers(HttpMethod.POST, "/productos/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.POST, "/clientes/**").hasAnyRole("ADMIN", "CAJERO")
                            .requestMatchers(HttpMethod.POST, "/facturas").hasRole("CAJERO")
                            .requestMatchers(HttpMethod.PUT, "/facturas/*/pagar").hasRole("CAJERO")
                            .requestMatchers(HttpMethod.PUT, "/facturas/*/anular").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET, "/facturas/cliente/**").hasAnyRole("ADMIN", "CAJERO", "CLIENTE")
                            .requestMatchers(HttpMethod.GET, "/facturas/cajero/**").hasAnyRole("ADMIN", "CAJERO")

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


}

