--
-- PostgreSQL database dump
--

\restrict 57hcqPIGMq1X78vsQx1RuZLdncMfTabi7CvpSl2ZbNhfgMcUhzkLwhJYAx8g0Nm

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.6 (Debian 17.6-2.pgdg13+1)

-- Started on 2025-11-11 10:08:18 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 16933)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- TOC entry 3006 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16953)
-- Name: Collection; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Collection" (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 16952)
-- Name: Collection_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Collection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3008 (class 0 OID 0)
-- Dependencies: 220
-- Name: Collection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Collection_id_seq" OWNED BY public."Collection".id;


--
-- TOC entry 230 (class 1259 OID 16994)
-- Name: Color; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Color" (
    id integer NOT NULL,
    name text NOT NULL,
    hex text NOT NULL
);


--
-- TOC entry 229 (class 1259 OID 16993)
-- Name: Color_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Color_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3009 (class 0 OID 0)
-- Dependencies: 229
-- Name: Color_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Color_id_seq" OWNED BY public."Color".id;


--
-- TOC entry 232 (class 1259 OID 17003)
-- Name: Feature; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Feature" (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- TOC entry 231 (class 1259 OID 17002)
-- Name: Feature_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Feature_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3010 (class 0 OID 0)
-- Dependencies: 231
-- Name: Feature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Feature_id_seq" OWNED BY public."Feature".id;


--
-- TOC entry 225 (class 1259 OID 16971)
-- Name: OutdoorIndoor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."OutdoorIndoor" (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- TOC entry 224 (class 1259 OID 16970)
-- Name: OutdoorIndoor_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."OutdoorIndoor_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3011 (class 0 OID 0)
-- Dependencies: 224
-- Name: OutdoorIndoor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."OutdoorIndoor_id_seq" OWNED BY public."OutdoorIndoor".id;


--
-- TOC entry 223 (class 1259 OID 16962)
-- Name: Size; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Size" (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- TOC entry 222 (class 1259 OID 16961)
-- Name: Size_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Size_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3012 (class 0 OID 0)
-- Dependencies: 222
-- Name: Size_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Size_id_seq" OWNED BY public."Size".id;


--
-- TOC entry 227 (class 1259 OID 16980)
-- Name: Surface; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Surface" (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- TOC entry 226 (class 1259 OID 16979)
-- Name: Surface_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Surface_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3013 (class 0 OID 0)
-- Dependencies: 226
-- Name: Surface_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Surface_id_seq" OWNED BY public."Surface".id;


--
-- TOC entry 219 (class 1259 OID 16944)
-- Name: Tile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Tile" (
    id integer NOT NULL,
    name text NOT NULL,
    "imageUrl" text,
    "collectionId" integer,
    "outdoorIndoorId" integer
);


--
-- TOC entry 233 (class 1259 OID 17011)
-- Name: TileColor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TileColor" (
    "tileId" integer NOT NULL,
    "colorId" integer NOT NULL
);


--
-- TOC entry 234 (class 1259 OID 17016)
-- Name: TileFeature; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TileFeature" (
    "tileId" integer NOT NULL,
    "featureId" integer NOT NULL
);


--
-- TOC entry 235 (class 1259 OID 17021)
-- Name: TileSize; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TileSize" (
    "tileId" integer NOT NULL,
    "sizeId" integer NOT NULL
);


--
-- TOC entry 228 (class 1259 OID 16988)
-- Name: TileSurface; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TileSurface" (
    "tileId" integer NOT NULL,
    "surfaceId" integer NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 16943)
-- Name: Tile_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Tile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3014 (class 0 OID 0)
-- Dependencies: 218
-- Name: Tile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Tile_id_seq" OWNED BY public."Tile".id;


--
-- TOC entry 217 (class 1259 OID 16934)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- TOC entry 2790 (class 2604 OID 16956)
-- Name: Collection id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Collection" ALTER COLUMN id SET DEFAULT nextval('public."Collection_id_seq"'::regclass);


--
-- TOC entry 2794 (class 2604 OID 16997)
-- Name: Color id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Color" ALTER COLUMN id SET DEFAULT nextval('public."Color_id_seq"'::regclass);


--
-- TOC entry 2795 (class 2604 OID 17006)
-- Name: Feature id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Feature" ALTER COLUMN id SET DEFAULT nextval('public."Feature_id_seq"'::regclass);


--
-- TOC entry 2792 (class 2604 OID 16974)
-- Name: OutdoorIndoor id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."OutdoorIndoor" ALTER COLUMN id SET DEFAULT nextval('public."OutdoorIndoor_id_seq"'::regclass);


--
-- TOC entry 2791 (class 2604 OID 16965)
-- Name: Size id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Size" ALTER COLUMN id SET DEFAULT nextval('public."Size_id_seq"'::regclass);


--
-- TOC entry 2793 (class 2604 OID 16983)
-- Name: Surface id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Surface" ALTER COLUMN id SET DEFAULT nextval('public."Surface_id_seq"'::regclass);


--
-- TOC entry 2789 (class 2604 OID 16947)
-- Name: Tile id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Tile" ALTER COLUMN id SET DEFAULT nextval('public."Tile_id_seq"'::regclass);


--
-- TOC entry 2986 (class 0 OID 16953)
-- Dependencies: 221
-- Data for Name: Collection; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Collection" (id, name) FROM stdin;
1	shine_g-glossy
2	classic_marbles
3	stones_g-mixes
4	urban_style
5	wood_selection
6	470_x_470
7	300_x_900
\.


--
-- TOC entry 2995 (class 0 OID 16994)
-- Dependencies: 230
-- Data for Name: Color; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Color" (id, name, hex) FROM stdin;
1	dark_gray	#303030
2	beige	#F5F5DC
3	black	#000000
4	blue	#0000FF
5	bronze	#CD7F32
6	saddle_brown	#8B4513
7	red	#D2042D
8	royal_blue	#0047AB
9	cream	#FFFDD0
10	dark_gray_2	#A9A9A9
11	gold	#FFD700
12	slate_gray	#474A51
13	beige_2	#BEB9A7
14	gray	#808080
15	yellow	#FFC30B
16	ivory	#FFFFF0
17	light_gray	#D3D3D3
18	navy	#000080
19	brown	#964B00
20	ecru	#EAE0C8
21	rust	#B7410E
22	silver	#C0C0C0
23	sky_blue	#87CEEB
24	snow	#FFFAFA
25	dark_brown	#483C32
26	white	#FFFFFF
27	olive_green	#B6BE9E
\.


--
-- TOC entry 2997 (class 0 OID 17003)
-- Dependencies: 232
-- Data for Name: Feature; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Feature" (id, name) FROM stdin;
2	frost_resistant
3	marble_effect
4	metal_/_oxide_effect
5	mix_effect
6	new_collection_2025
7	not_rectified
8	rectified
9	stone_effect
10	wood_effect
11	concrete_effect
1	carving_effect
\.


--
-- TOC entry 2990 (class 0 OID 16971)
-- Dependencies: 225
-- Data for Name: OutdoorIndoor; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."OutdoorIndoor" (id, name) FROM stdin;
1	outdoor_and_indoor
2	for_indoor_use_only
\.


--
-- TOC entry 2988 (class 0 OID 16962)
-- Dependencies: 223
-- Data for Name: Size; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Size" (id, name) FROM stdin;
1	1200x600x8
2	150x900x8
3	198x1200x8
4	225x900x8
5	300x1200x8
6	300x600x8
7	300x900x8
8	470x470x8
9	600x600x8
10	300x1300x8
\.


--
-- TOC entry 2992 (class 0 OID 16980)
-- Dependencies: 227
-- Data for Name: Surface; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Surface" (id, name) FROM stdin;
3	flat
4	full_lappato
5	glossy
6	mat
7	nat
8	nature_mat
9	relief
10	satin
11	semi-lappato
12	structured_mat
13	sugar
14	flat_mat
1	soft_touch_satin
2	super_shine_lappato
\.


--
-- TOC entry 2984 (class 0 OID 16944)
-- Dependencies: 219
-- Data for Name: Tile; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Tile" (id, name, "imageUrl", "collectionId", "outdoorIndoorId") FROM stdin;
15	palazzo_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 17.45.38.webp	1	1
17	cristalina_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 17.50.49.webp	1	1
18	teo_onice_sky	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 17.53.27.webp	1	1
19	teo_onice_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 17.53.50.webp	1	1
20	teo_onice_teal	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 17.54.29.webp	1	1
22	ocean_blue	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 17.55.56.webp	1	1
21	ashford_black	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 17.55.09.webp	1	1
23	vesuvio_anthracite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.00.28.webp	1	1
24	nebula_blue	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.02.26.webp	1	1
25	pietra_taupe	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.02.52.webp	1	1
26	lunaria_silver	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.03.35.webp	1	1
27	lunaria_biege	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.04.19.webp	1	1
28	moon_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.04.57.webp	1	1
29	moon_silver	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.05.52.webp	1	1
30	helen_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.08.15.webp	2	1
31	palazzo_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.08.34.webp	2	1
32	lago_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.09.26.webp	2	1
33	sracciatella_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.13.55.webp	2	1
34	mira_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.14.44.webp	2	1
35	bella_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.15.17.webp	2	1
36	sonata_beari	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.16.17.webp	2	1
37	teo_onice_pearl	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.16.43.webp	2	1
38	majestic_cream	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.17.20.webp	2	1
39	majestic_pearl	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.18.24.webp	2	1
40	river_beige	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.18.33.webp	2	1
41	marmolino_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.19.07.webp	2	1
42	marmolino_silver	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.20.05.webp	2	1
43	imperial_black	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.20.32.webp	2	1
12	itaka_cream	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 14.49.34.webp	1	1
2	itaka_cherry	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 13.13.06.webp	1	1
1	itaka_black	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 13.09.51.webp	1	1
3	itaka_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 13.19.39.webp	1	1
13	itaka_cobalt	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 17.40.12.webp	1	1
14	picassa_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 17.42.44.webp	1	1
16	alpina_silver	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 17.48.17.webp	1	1
46	granito_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.22.29.webp	2	1
45	tesora_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.21.45.webp	3	1
47	granito_anthracite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.22.57.webp	2	1
48	molika_silver	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.29.23.webp	3	1
49	molika_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.30.45.webp	3	1
50	terra_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.31.13.webp	3	1
51	terra_anthracite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.32.10.webp	3	1
52	terra_griege	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.33.06.webp	3	1
53	terra_beige	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.33.40.webp	3	1
54	megalit_silver	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.43.38.webp	3	1
55	megalit_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.45.36.webp	3	1
56	megalit_bronze	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.46.04.webp	3	1
57	mariya_anthracite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.47.26.webp	3	1
58	mariya_brown	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.48.27.webp	3	1
59	mariya_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.48.56.webp	3	1
60	arber_graphite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.49.34.webp	3	1
61	arber_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.50.12.webp	3	1
62	arber_silver	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.50.34.webp	3	1
63	slate_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.51.28.webp	3	1
64	slate_anthracite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.52.28.webp	3	1
65	flint_stone_gold	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.54.43.webp	3	1
66	treviso_silver	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.56.46.webp	3	1
67	treviso_beige	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.57.47.webp	3	1
68	treviso_ivory	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.58.14.webp	3	1
69	limestone_beige	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.58.47.webp	3	1
70	limestone_cream	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.59.26.webp	3	1
72	calypso_blue	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.01.44.webp	4	1
73	calypso_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.03.19.webp	4	1
80	calypso_brown	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.24.52.webp	4	1
112	bavaria_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.56.39.webp	5	1
114	bavarya_mocco	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.08.09.webp	5	1
115	bavarya_brown	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.09.32.webp	5	1
116	stefani_ivory	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.10.13.webp	5	1
71	calypso_navi	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.27.25.webp	4	1
82	calypso_biege	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.29.06.webp	4	1
83	soft_slate_athracite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.31.11.webp	4	1
84	soft_slate_silver	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.33.56.webp	4	1
85	soft_slate_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.34.20.webp	4	1
86	soft_slate_biege	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.35.09.webp	4	1
94	hannover_athracite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.42.22.webp	4	1
95	hannover_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.43.29.webp	4	1
96	hannover_silver	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.43.49.webp	4	1
97	art_anthracite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.44.43.webp	4	1
98	art_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.45.15.webp	4	1
99	art_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.45.40.webp	4	1
100	leon_anthracite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.45.55.webp	4	1
101	leon_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.46.56.webp	4	1
102	leon_silver	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.47.37.webp	4	1
103	leon_biege	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.47.45.webp	4	1
104	hamburg_biege	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.48.49.webp	4	1
105	hamburg_taupe	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.49.16.webp	4	1
106	hamburg_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.49.47.webp	4	1
107	hamburg_graphite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.50.06.webp	4	1
108	iron_rust	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.51.11.webp	4	1
109	iron_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.51.56.webp	4	1
110	iron_biege	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.52.22.webp	4	1
111	iron_anthracite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.52.53.webp	4	1
117	stefani_biege	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.11.14.webp	5	1
118	stefani_brown	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.11.33.webp	5	1
119	krakow_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.12.20.webp	5	1
120	krakow_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.12.47.webp	5	1
121	krakow_brown	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.13.09.webp	5	1
122	munchen_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.13.29.webp	5	1
123	munchen_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.14.10.webp	5	1
124	munchen_gold	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.14.28.webp	5	1
125	munchen_brown	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.14.58.webp	5	1
126	nordic_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.17.39.webp	5	1
127	nordic_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.18.35.webp	5	1
128	nordic_beige	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.18.53.webp	5	1
113	bavaria_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.02.43.webp	5	1
87	concrete_athracite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.38.53.webp	4	1
90	concrete_biege	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.40.09.webp	4	1
92	venecia_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.41.32.webp	4	1
168	romano_biege	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.21.03.webp	6	1
130	aurora_honey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.21.38.webp	5	1
131	aurora_brown	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.22.07.webp	5	1
132	tavolina_beige	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.22.28.webp	5	1
133	tavolin_brown	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.48.33.webp	5	1
134	canyon_beige	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.51.24.webp	5	1
135	canyon_gold	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.51.42.webp	5	1
136	canyon_brown	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.52.34.webp	5	1
137	aspen_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.52.57.webp	5	1
138	fortezza_ivory	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.53.35.webp	5	1
139	fortezza_beige	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.54.16.webp	5	1
140	fortezza_gold	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.54.34.webp	5	1
141	fortezza_brown	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.54.58.webp	5	1
142	timber_ivory	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.55.21.webp	5	1
143	timber_beige	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.55.59.webp	5	1
144	timber_gold	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.56.15.webp	5	1
145	castello_ivory	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.59.13.webp	5	1
146	castello_honey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.59.52.webp	5	1
147	munchen_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.00.38.webp	5	1
148	munchen_wite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.01.31.webp	5	1
149	munchen_gold	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.01.50.webp	5	1
150	munchen_brown	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.02.07.webp	5	1
151	albero_black	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.02.27.webp	5	1
152	taheo_beige	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.03.38.webp	5	1
153	taheo_gold	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.04.22.webp	5	1
157	armario_ivory	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.07.17.webp	5	1
156	ponte_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.06.13.webp	5	1
154	alpha_honey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.04.49.webp	5	1
155	alpha_nut	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.05.33.webp	5	1
158	saturio_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.11.20.webp	6	1
167	atlas_pearl	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.20.29.webp	6	1
166	onice_brown	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.19.34.webp	6	1
164	perfecto_silver	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.18.32.webp	6	1
165	perfecto_Biege	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.18.51.webp	6	1
162	perfecto_dark_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.17.38.webp	6	1
163	perfecto_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.18.15.webp	6	1
161	boticcino_beige	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.15.53.webp	6	1
159	andora_brown	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.13.36.webp	6	1
160	marquina_black	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.14.37.webp	6	1
169	ardeza_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.26.31.webp	6	1
170	ardeza_black	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.27.01.webp	6	1
171	ardeza_beige	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.27.28.webp	6	1
172	soft_slate_anthracite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.27.45.webp	6	1
173	soft_slate_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.28.30.webp	6	1
174	soft_slate_beige	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.28.54.webp	6	1
175	aura_light_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.29.15.webp	6	1
176	betono_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.30.25.webp	6	1
177	betono_anthracite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.31.08.webp	6	1
182	vulcano_beige	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.34.02.webp	6	1
184	hilton_graphite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.35.15.webp	6	1
183	vulcano_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.34.25.webp	6	1
181	vulcano_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.33.40.webp	6	1
178	dortmud_dark_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.32.05.webp	6	1
179	dortmud_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.32.50.webp	6	1
185	hilton_biege	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.36.21.webp	6	1
187	hilton_brown	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.36.55.webp	6	1
186	hilton_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.36.37.webp	6	1
180	vulcano_anthracite	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.33.07.webp	6	1
188	palazzo_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.39.49.webp	7	1
189	sonata_pearl	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.40.55.webp	7	1
190	marmolino_silverSonata Pearl	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.41.46.webp	7	1
191	marmolino_silver	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.42.19.webp	7	1
192	sicilia_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.42.50.webp	7	1
193	alcora_gold	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.43.24.webp	7	1
194	alcora_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.43.50.webp	7	1
195	majestic_cream	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.44.17.webp	7	1
196	majestic_pearl	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.45.09.webp	7	1
197	calacatta_gold	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.45.39.webp	7	1
198	art_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.46.39.webp	7	1
199	snow_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 21.47.22.webp	7	1
89	concrete_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.39.44.webp	4	1
88	concrete_grey	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.39.23.webp	4	1
91	venecia_anthraciete	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.40.53.webp	4	1
93	venecia_white	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 19.42.08.webp	4	1
129	aurora_biege	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 20.20.58.webp	5	1
44	marquina_black	https://storage.googleapis.com/my-store-hawk/Screenshot 2025-11-01 at 18.21.12.webp	1	1
\.


--
-- TOC entry 2998 (class 0 OID 17011)
-- Dependencies: 233
-- Data for Name: TileColor; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."TileColor" ("tileId", "colorId") FROM stdin;
23	12
24	10
25	13
26	13
27	13
28	10
29	22
30	24
31	24
32	24
33	26
34	26
35	24
36	16
37	16
38	20
39	20
40	13
41	10
42	22
43	25
46	10
45	10
47	12
48	10
49	10
50	10
51	12
52	13
53	13
54	17
55	13
56	14
57	14
58	25
59	17
60	14
61	13
62	22
63	10
64	25
65	25
12	20
66	17
67	13
68	20
69	13
2	5
1	3
3	17
13	23
14	24
16	17
15	16
17	17
18	17
19	17
20	17
70	20
72	24
22	18
21	1
73	24
80	19
71	14
82	24
83	14
84	17
85	10
86	20
87	1
88	10
89	17
90	20
91	25
92	10
93	22
94	12
95	14
96	10
97	10
98	22
99	22
100	12
101	10
102	10
103	20
104	20
105	13
106	10
107	25
108	25
109	10
110	20
111	1
112	10
113	20
114	13
115	5
116	20
117	5
118	6
119	10
120	10
121	14
122	13
123	20
124	15
125	5
126	17
127	10
128	22
129	20
130	20
131	6
132	6
133	5
134	20
135	11
136	6
136	11
137	20
138	20
139	15
140	15
141	19
142	20
143	5
144	15
145	20
146	10
147	10
148	20
149	5
150	5
151	1
152	20
153	19
153	20
157	20
156	22
154	5
155	5
158	26
168	13
167	20
166	5
164	22
165	20
162	10
163	22
161	20
159	19
160	1
169	13
170	3
171	20
172	10
173	22
174	20
175	17
176	10
177	10
182	20
184	10
185	20
186	22
187	19
180	22
181	10
183	17
178	10
179	22
188	24
189	24
190	24
191	24
192	24
193	24
194	24
195	20
196	17
197	20
198	20
199	24
44	3
\.


--
-- TOC entry 2999 (class 0 OID 17016)
-- Dependencies: 234
-- Data for Name: TileFeature; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."TileFeature" ("tileId", "featureId") FROM stdin;
2	2
2	6
2	8
2	3
1	2
1	6
1	8
1	3
3	3
3	8
3	6
3	2
13	2
13	3
13	8
13	6
14	2
14	6
14	8
14	3
16	3
16	8
16	6
16	2
15	3
15	8
15	6
15	2
17	2
17	6
17	8
17	3
18	2
18	6
12	3
12	8
12	6
12	2
18	8
18	3
19	2
19	6
19	8
19	3
20	2
20	6
20	8
20	3
22	3
22	8
22	6
22	2
21	3
21	8
21	6
21	2
23	3
23	6
23	8
23	2
24	2
24	8
24	6
24	3
25	2
25	8
25	6
25	3
26	2
26	8
26	6
26	3
27	2
27	8
27	6
27	3
28	2
28	8
28	6
28	3
29	2
29	8
29	6
29	3
30	2
30	8
30	3
31	2
31	8
31	3
32	3
32	8
32	2
33	2
33	8
33	3
34	2
34	8
34	3
35	2
35	8
35	3
36	2
36	8
36	3
37	2
37	8
37	3
38	2
38	8
38	3
39	2
39	8
39	3
40	2
40	8
40	3
41	2
41	8
41	3
42	2
42	8
42	3
43	2
43	8
43	3
46	2
46	8
46	3
45	6
45	9
45	8
45	2
47	9
47	6
47	1
47	8
47	2
48	5
48	6
48	1
48	2
48	8
49	5
49	6
49	1
49	2
49	8
50	5
50	6
50	1
50	2
50	8
51	5
51	6
51	1
51	2
51	8
52	5
52	6
52	1
52	2
52	8
53	5
53	6
53	1
53	2
53	8
54	9
54	2
54	8
55	9
55	2
55	8
56	9
56	2
56	8
57	1
57	9
57	2
57	8
58	1
58	9
58	2
58	8
59	1
59	9
59	2
59	8
60	1
60	9
60	2
60	8
61	1
61	9
61	2
61	8
62	1
62	9
62	2
62	8
63	9
63	2
63	8
64	9
64	2
64	8
65	6
65	9
65	2
65	8
66	1
66	9
66	2
66	8
67	1
67	9
67	2
67	8
68	1
68	9
68	2
68	8
69	1
69	9
69	2
69	8
70	1
70	9
70	2
70	8
147	2
147	10
72	5
72	1
72	2
72	8
73	5
73	1
73	2
73	8
80	5
80	2
80	8
71	5
71	1
71	2
71	8
82	8
82	2
82	1
82	5
83	9
83	1
83	2
83	8
84	9
84	1
84	2
84	8
85	9
85	1
85	2
85	8
86	9
86	1
86	2
86	8
87	1
87	2
87	8
87	11
88	1
88	2
88	8
88	11
89	1
89	2
89	8
89	11
90	1
90	2
90	8
90	11
91	1
91	2
91	8
91	11
92	1
92	2
92	8
92	11
93	1
93	2
93	8
93	11
94	2
94	8
94	11
95	2
95	8
95	11
96	2
96	8
96	11
97	2
97	8
97	11
98	2
98	8
98	11
99	2
99	8
99	11
100	1
100	2
100	8
100	11
101	1
101	2
101	8
101	11
102	1
102	2
102	8
102	11
103	1
103	2
103	8
103	11
104	4
104	1
104	2
104	8
105	4
105	1
105	2
105	8
106	4
106	1
106	2
106	8
107	4
107	1
107	2
107	8
108	4
108	2
108	8
109	4
109	2
109	8
110	4
110	2
110	8
111	4
111	2
111	8
112	8
112	10
112	2
113	10
113	2
113	8
114	10
114	8
114	2
115	10
115	8
115	2
116	1
116	10
116	8
116	2
117	1
117	10
117	8
117	2
118	1
118	10
118	8
118	2
119	10
119	8
119	2
120	10
120	8
120	2
121	10
121	8
121	2
122	2
122	8
122	10
123	2
123	8
123	10
124	8
124	2
124	10
125	2
125	8
125	10
126	8
126	2
126	10
127	8
127	2
127	10
128	8
128	2
128	10
129	8
129	2
129	10
130	10
130	2
130	8
131	10
131	2
131	8
132	10
132	2
132	8
133	2
133	10
133	8
134	2
134	10
134	8
135	2
135	10
135	8
136	2
136	10
136	8
137	2
137	10
137	8
138	2
138	10
138	8
139	2
139	10
139	8
140	2
140	10
140	8
141	2
141	10
141	8
147	8
148	2
148	10
148	8
149	2
149	10
149	8
150	2
150	10
150	8
151	6
151	1
142	8
142	10
142	2
142	1
143	8
143	10
143	2
143	1
144	8
144	10
144	2
144	1
145	2
145	10
145	8
146	2
146	10
146	8
151	2
151	10
151	8
152	6
152	2
152	10
152	8
153	6
153	2
153	10
153	8
157	8
157	10
157	2
157	6
156	8
156	10
156	2
156	6
154	8
154	10
154	2
154	6
155	8
155	10
155	2
155	6
158	3
158	2
158	7
168	9
168	2
168	7
167	7
167	2
167	3
167	1
166	7
166	2
166	3
166	1
164	7
164	2
164	3
164	1
165	7
165	2
165	3
165	1
162	7
162	2
162	3
162	1
163	7
163	2
163	3
163	1
161	7
161	2
161	3
161	1
159	7
159	2
159	3
160	7
160	2
160	3
169	9
169	1
169	2
169	7
170	9
170	1
170	2
170	7
171	9
171	1
171	2
171	7
172	9
172	1
172	2
172	7
173	9
173	1
173	2
173	7
174	9
174	1
174	2
174	7
175	11
175	2
175	7
176	11
176	2
176	7
177	11
177	2
177	7
182	1
182	11
182	2
182	7
184	1
184	11
184	2
184	7
185	1
185	11
185	2
185	7
186	1
186	11
186	2
186	7
187	1
187	11
187	2
187	7
180	7
180	2
180	11
180	1
181	1
181	11
181	2
181	7
183	7
183	2
183	11
183	1
178	7
178	2
178	11
179	7
179	2
179	11
188	3
188	2
188	8
189	1
189	3
189	2
189	8
190	1
190	3
190	2
190	8
191	1
191	3
191	2
191	8
192	3
192	2
192	8
193	3
193	2
193	8
194	3
194	2
194	8
195	1
195	3
195	2
195	8
196	1
196	3
196	2
196	8
197	3
197	2
197	8
198	3
198	2
198	8
199	3
199	2
199	8
44	3
44	8
44	2
\.


--
-- TOC entry 3000 (class 0 OID 17021)
-- Dependencies: 235
-- Data for Name: TileSize; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."TileSize" ("tileId", "sizeId") FROM stdin;
169	8
171	8
176	8
184	8
185	8
186	8
187	8
189	7
191	7
193	7
195	7
197	7
199	7
12	9
12	1
2	1
2	9
1	1
1	9
3	9
3	1
13	9
13	1
14	9
14	1
16	9
16	1
15	1
15	9
17	9
17	1
18	9
18	1
19	9
19	1
20	9
20	1
22	9
22	1
21	9
21	1
23	9
23	1
24	9
24	1
25	9
25	1
26	9
26	1
27	9
27	1
28	9
28	1
29	9
29	1
30	9
30	1
31	9
31	1
32	9
32	1
33	9
33	1
34	9
34	1
35	9
35	1
36	9
36	1
37	9
37	1
38	9
38	1
39	9
39	1
40	9
40	1
41	9
41	1
42	9
42	1
43	9
43	1
46	9
46	1
45	1
45	9
47	1
47	9
48	9
48	1
49	9
49	1
50	9
50	1
51	9
51	1
52	9
52	1
53	9
53	1
54	9
54	1
55	9
55	1
56	9
56	1
57	9
57	1
58	9
58	1
59	9
59	1
60	9
60	1
61	9
61	1
62	9
62	1
63	9
63	1
64	9
64	1
65	9
65	1
66	9
66	1
67	9
67	1
68	9
68	1
69	9
69	1
70	9
70	1
72	9
72	1
73	9
73	1
80	9
80	1
71	9
71	1
82	9
82	1
83	9
83	1
84	9
84	1
85	9
85	1
86	9
86	1
87	9
87	1
88	9
88	1
89	9
89	1
90	9
90	1
91	9
91	1
92	9
92	1
93	9
93	1
94	9
94	1
95	9
95	1
96	9
96	1
97	9
97	1
98	9
98	1
99	9
99	1
100	9
100	1
101	9
101	1
102	9
102	1
103	9
103	1
104	9
104	1
105	9
105	1
106	9
106	1
107	9
107	1
108	9
108	1
109	9
109	1
110	9
110	1
111	9
111	1
112	4
113	4
114	4
115	4
116	4
117	4
118	4
119	4
120	4
121	4
170	8
172	8
173	8
174	8
122	4
123	4
124	4
125	4
175	8
177	8
126	4
127	4
128	4
182	8
181	8
183	8
178	8
179	8
188	7
190	7
192	7
129	2
130	2
131	2
132	4
133	4
134	3
134	2
135	3
135	2
136	3
136	2
137	3
137	2
138	3
139	3
140	3
141	3
194	7
196	7
198	7
142	5
142	3
143	5
143	3
144	5
144	3
145	3
146	3
147	3
148	3
149	3
150	3
151	5
151	3
152	5
152	3
153	5
153	3
44	1
44	9
157	10
157	3
156	10
156	3
154	10
154	3
155	10
155	3
158	8
168	8
167	8
166	8
164	8
165	8
162	8
163	8
161	8
159	8
160	8
\.


--
-- TOC entry 2993 (class 0 OID 16988)
-- Dependencies: 228
-- Data for Name: TileSurface; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."TileSurface" ("tileId", "surfaceId") FROM stdin;
27	2
27	3
28	2
28	3
29	2
29	3
30	1
30	3
31	1
31	3
32	3
32	1
33	1
33	3
34	1
34	3
35	1
35	3
36	1
36	3
37	1
37	3
38	1
38	3
39	1
39	3
40	1
40	3
41	1
41	3
42	1
42	3
43	1
43	3
12	3
12	2
46	1
46	3
45	14
45	3
2	2
2	3
1	2
1	3
3	3
3	2
13	2
13	3
14	2
14	3
47	14
47	3
48	3
48	14
16	3
16	2
15	3
15	2
17	2
17	3
18	2
18	3
19	2
19	3
20	2
20	3
49	3
49	14
50	3
50	14
22	3
22	2
21	3
21	2
51	3
51	14
23	3
23	2
24	2
24	3
25	2
25	3
26	2
26	3
52	3
52	14
53	3
53	14
54	13
54	3
55	13
55	3
56	13
56	3
57	14
57	3
58	14
58	3
59	14
59	3
60	14
60	3
61	14
61	3
62	14
62	3
63	14
63	3
64	14
64	3
65	14
65	3
66	14
66	3
67	14
67	3
68	14
68	3
69	14
69	3
70	14
70	3
72	13
72	3
73	13
73	3
80	3
80	13
71	13
71	3
82	3
82	13
83	13
83	3
84	13
84	3
85	13
85	3
86	13
86	3
87	14
87	3
88	14
88	3
89	14
89	3
90	14
90	3
91	14
91	3
92	14
92	3
93	14
93	3
94	14
94	3
95	14
95	3
96	14
96	3
97	14
97	3
98	14
98	3
99	14
99	3
100	14
100	3
101	14
101	3
102	14
102	3
103	14
103	3
104	11
104	3
105	11
105	3
106	11
106	3
107	11
107	3
108	11
108	3
109	11
109	3
110	11
110	3
111	11
111	3
112	12
112	9
113	12
113	9
114	12
114	9
115	12
115	9
116	12
116	9
117	12
117	9
118	12
118	9
119	12
119	9
120	12
120	9
121	12
121	9
122	12
123	12
124	12
125	12
126	9
126	12
127	9
127	12
128	9
128	12
129	9
129	12
130	12
130	9
131	12
131	9
132	12
132	9
133	9
133	12
134	9
134	12
135	9
135	12
136	9
136	12
137	9
137	12
138	9
138	12
139	9
139	12
140	9
140	12
141	9
141	12
142	12
142	9
143	12
143	9
144	12
144	9
145	12
145	9
146	12
146	9
147	12
147	9
148	12
148	9
149	12
149	9
150	12
150	9
151	12
151	9
152	12
152	9
153	12
153	9
157	9
157	12
156	9
156	12
154	9
154	12
155	9
155	12
158	3
158	1
168	14
168	3
167	14
167	3
166	14
166	3
164	14
164	3
165	14
165	3
162	14
162	3
163	14
163	3
161	14
161	3
159	14
159	3
160	14
160	3
169	14
169	3
170	14
170	3
171	14
171	3
172	14
172	3
173	14
173	3
174	14
174	3
175	8
175	14
175	3
176	8
176	3
177	8
177	3
182	8
182	3
184	14
184	3
185	14
185	3
186	14
186	3
187	14
187	3
180	14
180	3
181	3
181	14
183	14
183	3
178	14
178	3
179	14
179	3
188	3
188	1
189	1
189	3
190	1
190	3
191	1
191	3
192	1
192	3
193	1
193	3
194	1
194	3
195	1
195	3
196	1
196	3
197	1
197	3
198	14
198	3
199	14
199	3
44	3
44	1
\.


--
-- TOC entry 2982 (class 0 OID 16934)
-- Dependencies: 217
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
372ace54-574d-4296-9b8a-478856fef362	55e8ae3a41496d35de55db5cb88b15e8f0214931d79e64b29cc58b5f5ccbd726	2025-11-01 11:42:32.221632+00	20251101114230_remove_surface_field	\N	\N	2025-11-01 11:42:31.472984+00	1
\.


--
-- TOC entry 3015 (class 0 OID 0)
-- Dependencies: 220
-- Name: Collection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Collection_id_seq"', 7, true);


--
-- TOC entry 3016 (class 0 OID 0)
-- Dependencies: 229
-- Name: Color_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Color_id_seq"', 27, true);


--
-- TOC entry 3017 (class 0 OID 0)
-- Dependencies: 231
-- Name: Feature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Feature_id_seq"', 11, true);


--
-- TOC entry 3018 (class 0 OID 0)
-- Dependencies: 224
-- Name: OutdoorIndoor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."OutdoorIndoor_id_seq"', 2, true);


--
-- TOC entry 3019 (class 0 OID 0)
-- Dependencies: 222
-- Name: Size_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Size_id_seq"', 10, true);


--
-- TOC entry 3020 (class 0 OID 0)
-- Dependencies: 226
-- Name: Surface_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Surface_id_seq"', 14, true);


--
-- TOC entry 3021 (class 0 OID 0)
-- Dependencies: 218
-- Name: Tile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Tile_id_seq"', 199, true);


--
-- TOC entry 2802 (class 2606 OID 16960)
-- Name: Collection Collection_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Collection"
    ADD CONSTRAINT "Collection_pkey" PRIMARY KEY (id);


--
-- TOC entry 2817 (class 2606 OID 17001)
-- Name: Color Color_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Color"
    ADD CONSTRAINT "Color_pkey" PRIMARY KEY (id);


--
-- TOC entry 2820 (class 2606 OID 17010)
-- Name: Feature Feature_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Feature"
    ADD CONSTRAINT "Feature_pkey" PRIMARY KEY (id);


--
-- TOC entry 2808 (class 2606 OID 16978)
-- Name: OutdoorIndoor OutdoorIndoor_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."OutdoorIndoor"
    ADD CONSTRAINT "OutdoorIndoor_pkey" PRIMARY KEY (id);


--
-- TOC entry 2805 (class 2606 OID 16969)
-- Name: Size Size_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Size"
    ADD CONSTRAINT "Size_pkey" PRIMARY KEY (id);


--
-- TOC entry 2811 (class 2606 OID 16987)
-- Name: Surface Surface_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Surface"
    ADD CONSTRAINT "Surface_pkey" PRIMARY KEY (id);


--
-- TOC entry 2822 (class 2606 OID 17015)
-- Name: TileColor TileColor_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TileColor"
    ADD CONSTRAINT "TileColor_pkey" PRIMARY KEY ("tileId", "colorId");


--
-- TOC entry 2824 (class 2606 OID 17020)
-- Name: TileFeature TileFeature_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TileFeature"
    ADD CONSTRAINT "TileFeature_pkey" PRIMARY KEY ("tileId", "featureId");


--
-- TOC entry 2826 (class 2606 OID 17025)
-- Name: TileSize TileSize_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TileSize"
    ADD CONSTRAINT "TileSize_pkey" PRIMARY KEY ("tileId", "sizeId");


--
-- TOC entry 2813 (class 2606 OID 16992)
-- Name: TileSurface TileSurface_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TileSurface"
    ADD CONSTRAINT "TileSurface_pkey" PRIMARY KEY ("tileId", "surfaceId");


--
-- TOC entry 2799 (class 2606 OID 16951)
-- Name: Tile Tile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Tile"
    ADD CONSTRAINT "Tile_pkey" PRIMARY KEY (id);


--
-- TOC entry 2797 (class 2606 OID 16942)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 2800 (class 1259 OID 17026)
-- Name: Collection_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Collection_name_key" ON public."Collection" USING btree (name);


--
-- TOC entry 2814 (class 1259 OID 17031)
-- Name: Color_hex_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Color_hex_key" ON public."Color" USING btree (hex);


--
-- TOC entry 2815 (class 1259 OID 17030)
-- Name: Color_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Color_name_key" ON public."Color" USING btree (name);


--
-- TOC entry 2818 (class 1259 OID 17032)
-- Name: Feature_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Feature_name_key" ON public."Feature" USING btree (name);


--
-- TOC entry 2806 (class 1259 OID 17028)
-- Name: OutdoorIndoor_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "OutdoorIndoor_name_key" ON public."OutdoorIndoor" USING btree (name);


--
-- TOC entry 2803 (class 1259 OID 17027)
-- Name: Size_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Size_name_key" ON public."Size" USING btree (name);


--
-- TOC entry 2809 (class 1259 OID 17029)
-- Name: Surface_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Surface_name_key" ON public."Surface" USING btree (name);


--
-- TOC entry 2831 (class 2606 OID 17058)
-- Name: TileColor TileColor_colorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TileColor"
    ADD CONSTRAINT "TileColor_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES public."Color"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2832 (class 2606 OID 17053)
-- Name: TileColor TileColor_tileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TileColor"
    ADD CONSTRAINT "TileColor_tileId_fkey" FOREIGN KEY ("tileId") REFERENCES public."Tile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2833 (class 2606 OID 17068)
-- Name: TileFeature TileFeature_featureId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TileFeature"
    ADD CONSTRAINT "TileFeature_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES public."Feature"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2834 (class 2606 OID 17063)
-- Name: TileFeature TileFeature_tileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TileFeature"
    ADD CONSTRAINT "TileFeature_tileId_fkey" FOREIGN KEY ("tileId") REFERENCES public."Tile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2835 (class 2606 OID 17078)
-- Name: TileSize TileSize_sizeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TileSize"
    ADD CONSTRAINT "TileSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES public."Size"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2836 (class 2606 OID 17073)
-- Name: TileSize TileSize_tileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TileSize"
    ADD CONSTRAINT "TileSize_tileId_fkey" FOREIGN KEY ("tileId") REFERENCES public."Tile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2829 (class 2606 OID 17048)
-- Name: TileSurface TileSurface_surfaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TileSurface"
    ADD CONSTRAINT "TileSurface_surfaceId_fkey" FOREIGN KEY ("surfaceId") REFERENCES public."Surface"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2830 (class 2606 OID 17043)
-- Name: TileSurface TileSurface_tileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TileSurface"
    ADD CONSTRAINT "TileSurface_tileId_fkey" FOREIGN KEY ("tileId") REFERENCES public."Tile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2827 (class 2606 OID 17033)
-- Name: Tile Tile_collectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Tile"
    ADD CONSTRAINT "Tile_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES public."Collection"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2828 (class 2606 OID 17038)
-- Name: Tile Tile_outdoorIndoorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Tile"
    ADD CONSTRAINT "Tile_outdoorIndoorId_fkey" FOREIGN KEY ("outdoorIndoorId") REFERENCES public."OutdoorIndoor"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3007 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-11-11 10:08:30 UTC

--
-- PostgreSQL database dump complete
--

\unrestrict 57hcqPIGMq1X78vsQx1RuZLdncMfTabi7CvpSl2ZbNhfgMcUhzkLwhJYAx8g0Nm

