export interface HeaderData {
  title: string;
  paragraph: string;
}

export interface AboutData {
  paragraph: string;
  Why: string[];
  Why2: string[];
}

export interface FeatureItem {
  icon: string;
  title: string;
  text: string;
}

export interface ServiceItem {
  icon: string;
  name: string;
  text: string;
}

export interface TestimonialItem {
  img: string;
  text: string;
  name: string;
}

export interface TeamMember {
  img: string;
  name: string;
  job: string;
}

export interface ContactData {
  address: string;
  phone: string;
  email: string;
  facebook: string;
  twitter: string;
  youtube: string;
}

export interface GalleryItem {
  thumb: string;
  title: string;
}

export interface SiteData {
  Header: HeaderData;
  About: AboutData;
  Features: FeatureItem[];
  Services: ServiceItem[];
  Testimonials: TestimonialItem[];
  Team: TeamMember[];
  Contact: ContactData;
}
