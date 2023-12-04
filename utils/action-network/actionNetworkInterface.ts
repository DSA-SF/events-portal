export interface ActionNetwork {
    total_pages:   number;
    per_page:      number;
    page:          number;
    total_records: number;
    _links:        ActionNetworkLinks;
    _embedded:     Embedded;
}

export interface Embedded {
    "osdi:events": OsdiEvent[];
}

export interface OsdiEvent {
    identifiers:              string[];
    created_date:             Date;
    description:              string;
    start_date:               Date;
    reminders:                Reminder[];
    total_accepted:           number;
    "action_network:sponsor": ActionNetworkSponsor;
    location:                 OsdiEventLocation;
    _links:                   OsdiEventLinks;
    modified_date:            Date;
    status:                   Status;
    transparence:             Transparence;
    visibility:               Visibility;
    guests_can_invite_others: boolean;
    origin_system:            OriginSystem;
    title:                    string;
    name:                     string;
    browser_url:              string;
    instructions:             string;
    "action_network:hidden":  boolean;
    end_date?:                Date;
    featured_image_url?:      string;
}

export interface OsdiEventLinks {
    self:                            Next;
    "osdi:organizer":                Next;
    "osdi:creator":                  Next;
    "action_network:embed":          Next;
    "osdi:attendances":              Next;
    record_attendance_helper:        Next;
    "osdi:record_attendance_helper": Next;
}

export interface Next {
    href: string;
}

export interface ActionNetworkSponsor {
    title:       Title;
    browser_url: string;
}

export enum Title {
    DSASANFrancisco = "DSA San Francisco",
}

export interface OsdiEventLocation {
    venue:          string;
    locality:       Locality;
    postal_code:    string;
    country:        Country;
    location:       LocationLocation;
    address_lines?: string[];
    region?:        Region;
}

export enum Country {
    Us = "US",
}

export enum Locality {
    Empty = "",
    SANFrancisco = "San Francisco",
    Sf = "SF",
}

export interface LocationLocation {
    latitude:  number;
    longitude: number;
    accuracy:  Accuracy;
}

export enum Accuracy {
    Rooftop = "Rooftop",
}

export enum Region {
    CA = "CA",
}

export enum OriginSystem {
    ActionNetwork = "Action Network",
}

export interface Reminder {
    method:  Method;
    minutes: number;
}

export enum Method {
    Email = "email",
}

export enum Status {
    Confirmed = "confirmed",
}

export enum Transparence {
    Opaque = "opaque",
}

export enum Visibility {
    Public = "public",
}

export interface ActionNetworkLinks {
    next:          Next;
    self:          Next;
    "osdi:events": Next[];
    curies:        Cury[];
}

export interface Cury {
    name:      string;
    href:      string;
    templated: boolean;
}
