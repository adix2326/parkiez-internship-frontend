package com.sessionManagement.sessionManagement.services.UserDetails;

import com.sessionManagement.sessionManagement.documents.Admin;
import com.sessionManagement.sessionManagement.documents.Attendant;
import com.sessionManagement.sessionManagement.documents.Operators;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

//@Component
public class UserDetailsImpl implements UserDetails
{
    private static final long serialVersionUID = 1L;
    private String id;

    private String username;

    private String password;

    private Collection< ?extends GrantedAuthority> authorities;

    public UserDetailsImpl(String id, String username, String password, Collection<? extends GrantedAuthority> authorities)
    {
        this.id = id;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    }

    public UserDetailsImpl(Object adminId) {
    }

    //building ADMIN
    public static UserDetailsImpl build(Admin admin)
    {
        List<GrantedAuthority> authorities = admin.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        return new UserDetailsImpl
                (
                        admin.getAdminId(),
                        admin.getUsername(),
                        admin.getPassword(),
                        authorities
                );
    }

//    Building OPERATOR
    public static UserDetailsImpl build(Operators admin)
    {
        List<GrantedAuthority> authorities = admin.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        return new UserDetailsImpl
                (
                        admin.getOperatorId(),
                        admin.getPhoneNo(),
                        admin.getPassword(),
                        authorities
                );
    }

//    Building ATTENDANT
    public static UserDetailsImpl build(Attendant admin)
    {
        List<GrantedAuthority> authorities = admin.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        return new UserDetailsImpl
                (
                        admin.getUserId(),
                        admin.getPhoneNo(),
                        admin.getPassword(),
                        authorities
                );
    }

    public String getId() {
        return id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }

}
