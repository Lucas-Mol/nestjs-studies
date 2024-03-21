CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE  TABLE  IF  NOT  EXISTS  public.users
  (
  id uuid NOT NULL  DEFAULT uuid_generate_v4(),
  name character varying(100) COLLATE pg_catalog."default"  NOT NULL,
  email character varying(70) COLLATE pg_catalog."default"  NOT NULL,
  password character varying(255) COLLATE pg_catalog."default"  NOT NULL,
  created_at timestamp without time zone  NOT NULL  DEFAULT  now(),
  updated_at timestamp without time zone  NOT NULL  DEFAULT  now(),
  deleted_at timestamp without time zone,
  CONSTRAINT  "PK_d7281c63c176e152e4c531594a8"  PRIMARY KEY (id)
  );
  
ALTER  TABLE  IF  EXISTS  public.users  OWNER  to  root;

CREATE  TABLE  IF  NOT  EXISTS  public.products
  (
  id uuid NOT NULL  DEFAULT uuid_generate_v4(),
  user_id uuid COLLATE pg_catalog."default"  NOT NULL,
  name character varying(100) COLLATE pg_catalog."default"  NOT NULL,
  price integer  NOT NULL,
  amount integer  NOT NULL,
  description character varying(255) COLLATE pg_catalog."default"  NOT NULL,
  category character varying(100) COLLATE pg_catalog."default"  NOT NULL,
  created_at timestamp without time zone  NOT NULL  DEFAULT  now(),
  updated_at timestamp without time zone  NOT NULL  DEFAULT  now(),
  deleted_at timestamp without time zone,
  CONSTRAINT  "PK_a5d976312809192261ed96174f3"  PRIMARY KEY (id)
  );
  
ALTER  TABLE  IF  EXISTS  public.products  OWNER  to  root;

CREATE  TABLE  IF  NOT  EXISTS  public.product_attributes
  (
  id uuid NOT NULL  DEFAULT uuid_generate_v4(),
  name character varying(100) COLLATE pg_catalog."default"  NOT NULL,
  description character varying(255) COLLATE pg_catalog."default"  NOT NULL,
  product_id uuid,
  CONSTRAINT  "PK_132816ff55e30a6bf554c9e2545"  PRIMARY KEY (id),
  CONSTRAINT  "FK_67339e59ab4b3ed091cf318f426"  FOREIGN KEY (product_id)
  REFERENCES  public.products (id) MATCH SIMPLE
  ON  UPDATE CASCADE
  ON DELETE CASCADE
  );
  
ALTER  TABLE  IF  EXISTS  public.product_attributes  OWNER  to  root;

CREATE  TABLE  IF  NOT  EXISTS  public.product_images
  (
  id uuid NOT NULL  DEFAULT uuid_generate_v4(),
  url  character varying(100) COLLATE pg_catalog."default"  NOT NULL,
  description character varying(100) COLLATE pg_catalog."default"  NOT NULL,
  product_id uuid,
  CONSTRAINT  "PK_d1cf326e8d58dbc469bd7fe2f32"  PRIMARY KEY (id),
  CONSTRAINT  "FK_eb1531605709dd94ec67b2141d0"  FOREIGN KEY (product_id)
  REFERENCES  public.products (id) MATCH SIMPLE
  ON  UPDATE CASCADE
  ON DELETE CASCADE
  );
  
ALTER  TABLE  IF  EXISTS  public.product_images  OWNER  to  root;
