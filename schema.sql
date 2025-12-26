--
-- PostgreSQL database dump
--

\restrict NSaR7qZBJF0jXzwocgY6Q9sRkPiCTjnNghpCp69jZ8S0tWphN8jwl1Vc1Xe3qDG

-- Dumped from database version 16.11 (Ubuntu 16.11-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.11 (Ubuntu 16.11-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: groups; Type: TABLE; Schema: public; Owner: luck
--

CREATE TABLE public.groups (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.groups OWNER TO luck;

--
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: luck
--

CREATE SEQUENCE public.groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.groups_id_seq OWNER TO luck;

--
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: luck
--

ALTER SEQUENCE public.groups_id_seq OWNED BY public.groups.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: luck
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_name character varying(255) NOT NULL,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.posts OWNER TO luck;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: luck
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.posts_id_seq OWNER TO luck;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: luck
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: luck
--

CREATE TABLE public.users (
    id integer NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    role text DEFAULT 'user'::text,
    membership text[]
);


ALTER TABLE public.users OWNER TO luck;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: luck
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO luck;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: luck
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: groups id; Type: DEFAULT; Schema: public; Owner: luck
--

ALTER TABLE ONLY public.groups ALTER COLUMN id SET DEFAULT nextval('public.groups_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: luck
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: luck
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: groups groups_name_key; Type: CONSTRAINT; Schema: public; Owner: luck
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_name_key UNIQUE (name);


--
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: luck
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: luck
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: luck
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: luck
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: idx_posts_created_at; Type: INDEX; Schema: public; Owner: luck
--

CREATE INDEX idx_posts_created_at ON public.posts USING btree (created_at DESC);


--
-- Name: idx_posts_group_name; Type: INDEX; Schema: public; Owner: luck
--

CREATE INDEX idx_posts_group_name ON public.posts USING btree (group_name);


--
-- Name: idx_posts_user_id; Type: INDEX; Schema: public; Owner: luck
--

CREATE INDEX idx_posts_user_id ON public.posts USING btree (user_id);


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: luck
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict NSaR7qZBJF0jXzwocgY6Q9sRkPiCTjnNghpCp69jZ8S0tWphN8jwl1Vc1Xe3qDG

