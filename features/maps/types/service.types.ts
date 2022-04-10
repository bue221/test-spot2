interface spot {
  alias: null;
  cache_favorites: number;
  cadastral_key: null;
  city_id: number;
  company_id: number;
  created_at: string;
  description: null;
  endorsement: null;
  ext_number: string;
  front: number;
  grace_time: null;
  guarantee_deposit: null;
  height: number;
  id: number;
  int_number: null;
  is_public: 1 | 0;
  latitude: number;
  level: null;
  listing_id: null;
  location: { type: string; coordinates: number[] };
  longitude: number;
  name: number;
  payload: null;
  pdf_description: null;
  people_flow: null;
  people_flow_term: number;
  photos: null;
  reference: number;
  rent_in_advance: null;
  spot_type_id: number;
  square_space: string;
  state: { id: 16; name: "Michoacán de Ocampo"; laravel_through_key: 72388 };
  street: string;
  term: number;
  updated_at: string;
  user_id: number;
  uuid: string;
  zip_code: {
    city: any;
    code: string;
    id: number;
    municipality: string;
    settlement: string;
    settlement_type: string;
    zone: string;
  };
  zip_code_id: number;
}

export interface DetailSpot {
  data: spot;
  status: boolean;
}

export interface TypeError {
  errors: { spot: string[] };
  message: string;
  status: boolean;
}

export interface TypeGetAllSpots {
  data: {
    spots: spot[];
  };
  links: {
    first: string;
    last: string;
    prev: null;
    next: null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string;
      label: string;
      active: boolean;
    }[];

    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  status: boolean;
}
