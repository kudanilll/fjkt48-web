export type MemberType = {
  _id: string;
  nickname: string;
  gen: number | "trainee";
  image: string;
  jikoshoukai: string;
  biodata: {
    name: string;
    birthday: string;
    height: number;
    horoscope: string;
    blood_group: "A" | "B" | "AB" | "O";
  };
  links: {
    instagram: string;
    twitter: string;
    titktok: string;
    // thread: string;
    idn: string;
    showroom: string;
  };
};
