# API DOCUMENTATION

This is documentation about the API to find out the latest information about JKT48 which was created in this project.

This documentation will continue to be updated because this project is still in the development stage.

Maybe I will stop this project if Marsha Lenathea Lapian (my oshi) has graduated from JKT48 :b

## Banner Home

| METHOD | API URL                                            |
| ------ | -------------------------------------------------- |
| `GET`  | `'${process.env.NEXT_PUBLIC_API_URL}/banner/home'` |

### Example

- **fetch:**

```typescript
await fetch(API_URL, { method: "GET" })
  .then((res) => res.json())
  .then((data) => console.log(data));
```

- **results:**

```json
{
  "status": 200,
  "message": "Success",
  "content": {
    "pajamadrive": {
      "url": "https://jkt48.com/theater/schedule?lang=id",
      "image": "https://firebasestorage.googleapis.com/v0/b/fjkt-48-09.appspot.com/o/banner%2Fhome%2Fpajamadrive.jpg?alt=media&token=081c1f3e-d69d-428f-a1c6-6f6a0a3244f9"
    },
    ...
  }
}
```

---

## Profile Member

| METHOD | API URL                                       |
| ------ | --------------------------------------------- |
| `GET`  | `'${process.env.NEXT_PUBLIC_API_URL}/member'` |

### Example

- **fetch:**

```typescript
await fetch(API_URL, { method: "GET" })
  .then((res) => res.json())
  .then((data) => console.log(data));
```

- **results:**

```json
{
  "status": 200,
  "message": "Success",
  "content": {
    "marsha_lenathea_lapian": {
      "image": "https://firebasestorage.googleapis.com/v0/b/fjkt-48-09.appspot.com/o/member-trainee-profile-image%2Fmarsha_lenathea.jpg?alt=media&token=aaf37d4e-98e1-428a-8e10-33cf4923697f",
      "showroom": "https://www.showroom-live.com/JKT48_Marsha",
      "twitter": "https://twitter.com/L_MarshaJKT48",
      "horoscope": "Capricorn",
      "idn": "https://app.idn.media/KChuCiV1PcH42uwW8",
      "height": 163,
      "img_path": "marsha_lenathea",
      "blood_group": "O",
      "name": "Marsha Lenathea Lapian",
      "nickname": "Marsha",
      "jikoshoukai": "Seperti pizza yang selalu dinanti-nantikan semua orang, selalu nantikan aku ya! Halo, aku Marsha.",
      "instagram": "https://www.instagram.com/jkt48.marsha/",
      "birthday": "9 Januari 2006",
      "tiktok": "https://www.tiktok.com/@marsha.jkt48/",
      "gen": 9
    },
    ...
  }
}
```

---

## Profile Trainee

| METHOD | API URL                                        |
| ------ | ---------------------------------------------- |
| `GET`  | `'${process.env.NEXT_PUBLIC_API_URL}/trainee'` |

### Example

- **fetch:**

```typescript
await fetch(API_URL, { method: "GET" })
  .then((res) => res.json())
  .then((data) => console.log(data));
```

- **results:**

```json
{
  "status": 200,
  "message": "Success",
  "content": {
    "alya_amanda": {
      "gen": 11,
      "horoscope": "Virgo",
      "img_path": "alya_amanda",
      "twitter": "https://twitter.com/AA_AlyaJKT48",
      "instagram": "https://www.instagram.com/jkt48.alya_/",
      "image": "https://firebasestorage.googleapis.com/v0/b/fjkt-48-09.appspot.com/o/member-trainee-profile-image%2Falya_amanda.jpg?alt=media&token=b34036ab-85a9-4e10-ab9f-8466a195aba6",
      "nickname": "Alya",
      "birthday": "26 Agustus 2006",
      "name": "Alya Amanda",
      "jikoshoukai": "",
      "tiktok": "https://www.tiktok.com/@alyajkt48/",
      "blood_group": "A",
      "idn": "https://app.idn.media/",
      "height": 165,
      "showroom": "https://www.showroom_live.com/"
    }
  },
  ...
}
```

---

## News

| METHOD | API URL                                     |
| ------ | ------------------------------------------- |
| `GET`  | `'${process.env.NEXT_PUBLIC_API_URL}/news'` |

### Example

- **fetch:**

```typescript
await fetch(API_URL, { method: "GET" })
  .then((res) => res.json())
  .then((data) => console.log(data)); // return as array
```

- **results:**

```json
{
  "status": 200,
  "message": "Success",
  "content": [
    {
      "id": "02012024",
      "thumbnail": "https://firebasestorage.googleapis.com/v0/b/fjkt-48-09.appspot.com/o/news%2Fthumbnail%2Fpengumuman-tentang-pertunjukan-teater-kelulusan-yessica-tamara.jpg?alt=media&token=09185ba9-acbf-4c6c-bc27-85327d647e32",
      "slug": "pengumuman-tentang-pertunjukan-teater-kelulusan-yessica-tamara",
      "title": "Pengumuman Teater Kelulusan Yessica Tamara",
      "source": "jkt48.com",
      "date": "2 Januari 2024",
      "category": "theater"
    },
    ...
  ]
}
```

### Example Fetch By ID

- **fetch:**

```typescript
const url = `${API_URL}?id=02012024`;
await fetch(url, { method: "GET" })
  .then((res) => res.json())
  .then((data) => console.log(data)); // return as object
```

- **results:**

```json
{
  "status": 200,
  "message": "Success",
  "content": {
    "thumbnail": "https://firebasestorage.googleapis.com/v0/b/fjkt-48-09.appspot.com/o/news%2Fthumbnail%2Fpengumuman-tentang-pertunjukan-teater-kelulusan-yessica-tamara.jpg?alt=media&token=09185ba9-acbf-4c6c-bc27-85327d647e32",
    "slug": "pengumuman-tentang-pertunjukan-teater-kelulusan-yessica-tamara",
    "title": "Pengumuman Teater Kelulusan Yessica Tamara",
    "source": "jkt48.com",
    "date": "2 Januari 2024",
    "category": "theater"
  }
}
```

---

## Schedule

| METHOD | API URL                                         |
| ------ | ----------------------------------------------- |
| `GET`  | `'${process.env.NEXT_PUBLIC_API_URL}/schedule'` |

If you just do a fetch with the URL above, you will only get year information. like this:

```json
{
  "status": 200,
  "message": "Success",
  "content": [
    {
      "id": "2024"
    }
  ]
}
```

To get more detailed information, you can add the parameter `?date=year-month`.

for the month parameter, you can see in [this code](https://github.com/achmaddaniel24/fjkt48-web/blob/production/src/utils/get-time.ts), in the `monthStringArray` variable and make it lower case.

### Example

- **fetch:**

```typescript
const url = `${API_URL}?date=2024-januari`;
await fetch(url, { method: "GET" })
  .then((res) => res.json())
  .then((data) => console.log(data)); // return as array
```

- **results:**

```json
{
  "status": 200,
  "message": "Success",
  "content": [
    {
      "id": "25",
      "event": "Aturan Anti Cinta",
      "day": "Kamis",
      "time": "19:00 WIB",
      "category": "jkt48",
      "date": "25 Januari 2024"
    },
    {
      "id": "26",
      "event": "Ingin Bertemu",
      "date": "26 Januari 2024",
      "category": "trainee",
      "day": "Jumat",
      "time": "19:00 WIB"
    }
    ...
  ]
}
```
