import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'newborn',
    name: 'Newborn',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANbV7t72r4aVUQq3c1ovTS2d6IJMQOj6NZMFFZzKW1DDL5od4L1JjvjB95fqm8QA5reU_i5IgUTNtnXz5AdskE59U5qH1Z7Rlgf05btSJc4mYL-5OydxSKigeJnJPgwo8l6N8sV-SGkb-Rivty9ZxH3sPGEoLaLtDcnD1xsAPaImukvmpB-zRuErltXzx0VY1qbx6b9nFWcjbWjPNZJzU0RKJ5g4mkzB_b1eP-GF8yzuEhI4molWbpjG7el656FrRy0nIgQp3ss-Om',
    bgColor: 'bg-secondary-container/40'
  },
  {
    id: 'knitwear',
    name: 'Knitwear',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbqGirzcK3T6pY0JPWO3W0bSEOEfFp_x9Xa5pOPQZaSMFRg8uNjwr3LScrYfZFfM6FhKf1GXfb0HfVbCjEAiLHfRwWEooOyeqDTC-IcZKAMJ-W-SwUNrpFhlTU6GWcOqkXYtLrhoo94beGXEk4YTNoP0tCccVZuxp-BAytAQ2QMWD6N488T8mUPkt9cnINXktZg3b-6BKDH9q39pjTNi531TaByfmqDFswILZef5vXFF8Gth99CURgfXMfuzxw_V88G7s-J2k1a99p',
    bgColor: 'bg-primary-container/40'
  },
  {
    id: 'organic-cotton',
    name: 'Organic Cotton',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT_yyz-FSF2P1185Yd8sHeNIKL19iOle5HEqefgWR-cx7yugQuh6g9-rSYT2M4FNwgCASu6vG5do1BUoH2y6sQ2ZaBjZ4g2t5zUTkkfq_r76Ad0nLo24efPdtsatQ9OWnOOL5KpiubouNJSKJ66uLHW2XtsXvDW31qv-fdN-ZTzajVXLodlS-bhPb17e990bTvxsevGD7Cejpv8A0UIHm9qOH5Kzj_A7ONTUyU5UWU9iHIuiYkpUOrrfrRzDSvgnO0v7BIWxMKIlfv',
    bgColor: 'bg-tertiary-container/40'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJBjP_xhxpTy4h_dQ5R5cN4WI3x8t_c1mBMh5YIC8kjVIr03k0DnrbareIkUK0yvZGBClMXPFq9VzghJgFEiYdNgZ81W8ylsUCGI_6-miNbK4a67AZ7ZokfZE1R9E6DFaGE8oPFdvHU0iDrxYMwnyDsjaIcwtZWQfRj_wtqUXyY8IRsYHH2dY4oeWqRd6BPV8j_zuenKebUrgPSdBm-dPPh6fKGS4KpfJHooPSLctZ_kwvxr2iCg41Bef_hrGCgPfi-0cAmQ6y4K-H',
    bgColor: 'bg-surface-variant/40'
  },
  {
    id: 'boys',
    name: 'Boys',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAI6hENwHFcEhldc-NZ8iUdWbChP9bmVxlMRqX_gV4gM5NY8i0dn4q0TXsSaXlZA_hH_R6a2XT6Y_B_rIQ3mPrbL2erYR8v_ulwyiBnPbb-LgS7ggElY9g9OjhAkl4aVmxwCUtFYn3hxE3oNCXhZtJwZoU-g1dlWKtcty3mIWZ6DiUTslPAZsj787pn4Zn9K8oIojvOCABAQuv8xQl4VoITWd4GKRNR0V0oEmrG5qSX9hRIydvj2o3clg1RFrySJYHXLuBB7vP3RcC',
    bgColor: 'bg-sky-100/50'
  },
  {
    id: 'girls',
    name: 'Girls',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5aIOsCtlptr654sr9GLOvGUfH4fqdWGv5iRIbYOx37FEwVvR221YusKt8E2Fj-xfEmALa1Lq5uKDd7GZNylrw2zNBuweI-5WHgAmPxNW5Uy6heyfJ6fKxqwEIkUZ18VEPfUdt6KIH0M_rZaOI3ZxWeD3XMVCB9lctsbyx5zHiZ3QS8TqTNr7n0D9gz0cC8jKEEo5EWXAHlKzpo27k26eBRxi0EpK-aloTKInAUCF32cLZJTPz8-JEezVpkqNGk5XCv1G6JDdeuoUq',
    bgColor: 'bg-pink-100/50'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'essential-ribbed-romper',
    name: 'Essential Ribbed Romper',
    price: 9.50,
    originalPrice: 12.00,
    colorName: 'Sand Melange',
    colorHex: '#E5D3C5',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwjz9nVRxOVfIppOHIKVOgtBbpVDhYIp32G8F4Yje6HLf1fMwhdCWUksSnSijP8pYsomt4kdQquJqKNHvx1FPR6jdFO3YC3gZEVlrNJLnFeZuivyB_XbfdGn5kJzw9xoEPEsB6O4iGURgQfW2cBxqGkiL5-sdNBLZHfKXFy7_aqvWVJXV-Rj9WnbokFO92lh788Grvj-FwY6F16ZUv5tKGHO0CVGuf5tbJg1xsli13Bqr_qA-gGZUZ6QnNhH6Zd0RSw7lkub_6RrUA',
    description: 'Handcrafted from our signature Cloud-Touch™ Organic Cotton. Features a breathable ribbed knit with classic natural wooden button accents. Perfect for maximum daily snuggles.',
    sizes: ['0-3 Months', '3-6 Months', '6-12 Months'],
    category: 'Newborn',
    isNew: true,
    rating: 4.8,
    reviewsCount: 86,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDwjz9nVRxOVfIppOHIKVOgtBbpVDhYIp32G8F4Yje6HLf1fMwhdCWUksSnSijP8pYsomt4kdQquJqKNHvx1FPR6jdFO3YC3gZEVlrNJLnFeZuivyB_XbfdGn5kJzw9xoEPEsB6O4iGURgQfW2cBxqGkiL5-sdNBLZHfKXFy7_aqvWVJXV-Rj9WnbokFO92lh788Grvj-FwY6F16ZUv5tKGHO0CVGuf5tbJg1xsli13Bqr_qA-gGZUZ6QnNhH6Zd0RSw7lkub_6RrUA'
    ]
  },
  {
    id: 'newborn-knitted-set',
    name: 'Newborn Knitted Set',
    price: 11.00,
    originalPrice: 14.00,
    colorName: 'Sage Green',
    colorHex: '#D1E2D1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxenHuvEYN9riujxorLHfYQ8Ni8eFXD7rnRTD0sJO5ycbcMdvJW-T8-ycWi1YSSttMs825bry7MXy_HpEI_7jYCEXyKMX2xgH0c8Np6ccbq8Ke09Oz1pG8Xzmtc3AtzUM67Jp98a7CgaFTvaZi5-EFY5Y21o0_mL0kitU8jIrM1xyNODl5McZTL_aN5yNPOHcSZKuP0iVjCqZNac4B3Usc5WxI438NSueUf4mLLBnquxvvG88zzRkvLoX5MIgqMIWYMJ_DsuUNpmn0',
    description: 'A cozy baby beanie and matching booties set knit from premium organic cotton and fine wool. Keeps tiny ears and feet beautifully snuggled during breezy mornings.',
    sizes: ['0-3 Months', '3-6 Months'],
    category: 'Knitwear',
    rating: 4.9,
    reviewsCount: 52,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCxenHuvEYN9riujxorLHfYQ8Ni8eFXD7rnRTD0sJO5ycbcMdvJW-T8-ycWi1YSSttMs825bry7MXy_HpEI_7jYCEXyKMX2xgH0c8Np6ccbq8Ke09Oz1pG8Xzmtc3AtzUM67Jp98a7CgaFTvaZi5-EFY5Y21o0_mL0kitU8jIrM1xyNODl5McZTL_aN5yNPOHcSZKuP0iVjCqZNac4B3Usc5WxI438NSueUf4mLLBnquxvvG88zzRkvLoX5MIgqMIWYMJ_DsuUNpmn0'
    ]
  },
  {
    id: 'daily-onesie-bundle',
    name: 'Daily Onesie Bundle',
    price: 14.50,
    originalPrice: 15.00,
    colorName: 'Earth Pack',
    colorHex: '#C59B74',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTilFEuQyCN3jA2VTMEKk4QQJy9SltxlwP2y0EB2TICGQ7SaNcvC5n3FSXI3JctVHg-Dhwb4tbPsz6Kes0q8p2KHpub26jXxG3pEYd0II8Iyj06Bl5jjIta32Jgk63HB1PFbsMAtsbgSrc5aFCA9yVY1EVWFqpxFkRpmylJBEG0B0jryGEy-3OZVJWEJDd_mh1xG-1alvVF0R1KWmt1POvkPqm32_AFv1SaFueGtpQ4ed8UnOUiEpoOtlBR5k63ZsogcjXUUpv4ABU',
    description: 'Our core set of three organic cotton onesies in earthy pastel tones: terracotta, oatmeal, and dusty rose. Durable, ultra-soft, and designed with envelope shoulders.',
    sizes: ['0-3 Months', '3-6 Months', '6-12 Months'],
    category: 'Newborn',
    rating: 4.7,
    reviewsCount: 110,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTilFEuQyCN3jA2VTMEKk4QQJy9SltxlwP2y0EB2TICGQ7SaNcvC5n3FSXI3JctVHg-Dhwb4tbPsz6Kes0q8p2KHpub26jXxG3pEYd0II8Iyj06Bl5jjIta32Jgk63HB1PFbsMAtsbgSrc5aFCA9yVY1EVWFqpxFkRpmylJBEG0B0jryGEy-3OZVJWEJDd_mh1xG-1alvVF0R1KWmt1POvkPqm32_AFv1SaFueGtpQ4ed8UnOUiEpoOtlBR5k63ZsogcjXUUpv4ABU'
    ]
  },
  {
    id: 'botanical-swaddle',
    name: 'Botanical Swaddle',
    price: 11.50,
    originalPrice: 13.50,
    colorName: 'Ivory Bloom',
    colorHex: '#FCF9F2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfX6atPiG7zSs3J3eed1GPece0cctgDFf3W2Epw3KcxgmkGROGy1bHwLb5nTKkRBHJ636HPe8cDkdj6ploRrkI93g7vWkcDcjqllzeaAv9Gn74-78_x4nmFqLR8m22dgjrtPv4SyIugodRP2EPvOIjnmVc17fybVfJABq6AzU9KdYuBSJdsHKpPZx7NHkI05z12t63N-_4wm7cQdlf0aWYt3lSrVg5oGRTZi8mOw_s4K-cAUwi8nBS70JPwjyAomZ5_dh4x1nB3lDj',
    description: 'A beautifully light organic cotton swaddle blanket featuring a delicate hand-drawn botanical print of eucalyptus. Extremely breathable, hypoallergenic, and calming.',
    sizes: ['One Size'],
    category: 'Organic Cotton',
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 143,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfX6atPiG7zSs3J3eed1GPece0cctgDFf3W2Epw3KcxgmkGROGy1bHwLb5nTKkRBHJ636HPe8cDkdj6ploRrkI93g7vWkcDcjqllzeaAv9Gn74-78_x4nmFqLR8m22dgjrtPv4SyIugodRP2EPvOIjnmVc17fybVfJABq6AzU9KdYuBSJdsHKpPZx7NHkI05z12t63N-_4wm7cQdlf0aWYt3lSrVg5oGRTZi8mOw_s4K-cAUwi8nBS70JPwjyAomZ5_dh4x1nB3lDj'
    ]
  },
  {
    id: 'quilted-cloud-jacket',
    name: 'Quilted Cloud Jacket',
    price: 15.00,
    originalPrice: 15.00,
    colorName: 'Caramel',
    colorHex: '#C59B74',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAI6hENwHFcEhldc-NZ8iUdWbChP9bmVxlMRqX_gV4gM5NY8i0dn4q0TXsSaXlZA_hH_R6a2XT6Y_B_rIQ3mPrbL2erYR8v_ulwyiBnPbb-LgS7ggElY9g9OjhAkl4aVmxwCUtFYn3hxE3oNCXhZtJwZoU-g1dlWKtcty3mIWZ6DiUTslPAZsj787pn4Zn9K8oIojvOCABAQuv8xQl4VoITWd4GKRNR0V0oEmrG5qSX9hRIydvj2o3clg1RFrySJYHXLuBB7vP3RcC',
    description: 'A premium, beautifully structured toddler-sized quilted jacket made from 100% organic cotton. Features puffy insulation, warm tactile texture, and eco-friendly stitching.',
    sizes: ['6-12 Months', '12-18 Months'],
    category: 'Knitwear',
    rating: 4.9,
    reviewsCount: 94,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCAI6hENwHFcEhldc-NZ8iUdWbChP9bmVxlMRqX_gV4gM5NY8i0dn4q0TXsSaXlZA_hH_R6a2XT6Y_B_rIQ3mPrbL2erYR8v_ulwyiBnPbb-LgS7ggElY9g9OjhAkl4aVmxwCUtFYn3hxE3oNCXhZtJwZoU-g1dlWKtcty3mIWZ6DiUTslPAZsj787pn4Zn9K8oIojvOCABAQuv8xQl4VoITWd4GKRNR0V0oEmrG5qSX9hRIydvj2o3clg1RFrySJYHXLuBB7vP3RcC'
    ]
  },
  {
    id: 'easy-fit-drawstring-pants',
    name: 'Easy-Fit Drawstring Pants',
    price: 8.50,
    originalPrice: 10.00,
    colorName: 'Dusty Blue',
    colorHex: '#7B97A6',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDLiI3MbTFp5w6yKZptWIIBNA7zo6dUiODF_YpvZX3rJm-sGxlofwmnBDO670pInDn321GEn7GZGsO1BxT6MZW-eMQqo1xEZU1dkpFUNZGKtJZaj2bWhsxlEfpGJ2yVV9G5RLCAsVsCE641YWLVFISieYbowwNem4RrZhje9LKgHCF13o_oF6TbJxOZsVXMt1FgA6ZIz7hz1QxF4zP4_BxBq0LfF-zebDJ1vC0acGRdSgDnDx5kj-wg6cVa_vLhJpgGQXDQxQKgaYF',
    description: 'Relaxed and gentle baby drawstring trousers made from organic crinkled cotton muslin. Breathable and comfortable for exploration.',
    sizes: ['3-6 Months', '6-12 Months'],
    category: 'Newborn',
    rating: 4.6,
    reviewsCount: 61,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDLiI3MbTFp5w6yKZptWIIBNA7zo6dUiODF_YpvZX3rJm-sGxlofwmnBDO670pInDn321GEn7GZGsO1BxT6MZW-eMQqo1xEZU1dkpFUNZGKtJZaj2bWhsxlEfpGJ2yVV9G5RLCAsVsCE641YWLVFISieYbowwNem4RrZhje9LKgHCF13o_oF6TbJxOZsVXMt1FgA6ZIz7hz1QxF4zP4_BxBq0LfF-zebDJ1vC0acGRdSgDnDx5kj-wg6cVa_vLhJpgGQXDQxQKgaYF'
    ]
  },
  {
    id: 'soft-mint-romper',
    name: 'Soft Mint Romper',
    price: 13.00,
    originalPrice: 15.00,
    colorName: 'Soft Mint',
    colorHex: '#A0D6B4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDajus6WTMaGCz7faosiwQ7BsOOxFyrKbuH2l7rBWsZRaCiKbmllFoNmGKGGuWZEOPh2IR0rnbQmXVZoyaDsOQzUJ0Z1zfPWfHarVjj32Mc-jnr_XENqSCJlfDK7MpSLB2QI05k3BBqNA-0KH6cZCQ0R8c-kljmqRIMgZjUYzUzPQZeCxn6_TwZLHoX0LySIGSDwRH8ekhFuAEWwT-hra-_FQYUwkBXyp5WNoaoxqqXQetQXX6FW5rZXG6rx3wCc3Qh8D9ZUlNrDcT',
    description: 'Handcrafted from our signature Cloud-Touch™ Organic Cotton. This GOTS-certified fabric is double-layered for a puffy, quilted feel that provides gentle warmth without overheating. Breathable, hypoallergenic, and incredibly soft against delicate newborn skin.',
    sizes: ['0-3 Months', '3-6 Months', '6-12 Months'],
    category: 'Newborn',
    isNew: true,
    rating: 4.5,
    reviewsCount: 124,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBDajus6WTMaGCz7faosiwQ7BsOOxFyrKbuH2l7rBWsZRaCiKbmllFoNmGKGGuWZEOPh2IR0rnbQmXVZoyaDsOQzUJ0Z1zfPWfHarVjj32Mc-jnr_XENqSCJlfDK7MpSLB2QI05k3BBqNA-0KH6cZCQ0R8c-kljmqRIMgZjUYzUzPQZeCxn6_TwZLHoX0LySIGSDwRH8ekhFuAEWwT-hra-_FQYUwkBXyp5WNoaoxqqXQetQXX6FW5rZXG6rx3wCc3Qh8D9ZUlNrDcT',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBYVT0GxuE6vJNCoihfbS5coT68_l4RCtgdu5tAJgenQ9AHlRVIKq7kZEg60cHX7NHWnhfwhZFFX16AXZfOmG3u1CNZqCDBEzw5gLdbImrPSJxIElHgTwZfIM_F3PTkllauPZwqp6c0SvzGyLetQ-p-b4wIKseLsh1bt-_k1jpzxlrkscIS6oVXPECqvqvdb6kGK5MZ2ZuwyyAlWxG4VbDJvwh_MwIPoxUOhZcJY0OIaQKuIoc6V_PWCRiqZTWQ8CCh-z1v_1oCuwqs',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAheqMmgzhxjwbhoreyvJA-mwik9rZkISMOit0_pkPCzE2de2X-xFaE5q9PauYm9vnZMPZwli6ywYC6HmxtViwaXl35d5-lTpWyASTBhQmdpcxntY3Ye5Rb3iQKYooXqKtJnQSMDXwXxebayla3rJvbaOvcQcZdVZ7DAF9XmLJne6vbnViSNQsa85PI5sP1Lgk2_BBqca-0c4dW3Gf2BhE7Ni7eVzlGg8yWmDK876n0WD0AC1cmfTpokS_P7NDOqxSwASjGcm8LbBBF',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3f_ZnH-u879OJC6vMLMJP_88NxPLkx8QmcEVTE6KDhUE_w2DrPiu7xKTcSunRmW41FpGRqKdF7mlRZTBRQxfo-eBOBX27ZvgCz0EXISdzJXvBaPQENqiC0LMLPljjNbOEiCBPaeIKBlo31goLf8VMLmY7e5B-YmkM3R1BxaZF1hUxPrDMUYHPUUPvpapqCfbtoO1ZuqnqWL7lSzKvNaqKzwdavhMBfVoR4g2jxf4Qw_nlcyebvfUY5sm87fyozaJIFlezOd85mC_R'
    ]
  },
  {
    id: 'ribbed-organic-romper',
    name: 'Ribbed Organic Romper',
    price: 10.00,
    originalPrice: 12.00,
    colorName: 'Sage',
    colorHex: '#96ad98',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfcSmwL966fdbtPjWJf97yHwoAPso--XpFPExIM5T5GYg0XTQgczEhJi2uoRq2gPXRIBs87GFW6JWzFCiODAw_vzQw2RW5nea-uvJUV1_MkbT01cjrJqV30eNigdaWaRFgBjU2hFo6twONX8_Ibz01knXgKGbms3W0u5UeB1qbqq3tHKwjuoUFdAEZaj27zt24H_0_gwc31PTdpJQYyC1LLt1wgNwd060RuEyNAee-LmTWOMVjwVPztCFOxeiDk1h8c6LcCjsBKtrM',
    description: 'Our top-trending ribbed GOTS-certified romper. Highly flexible, airy, and gentle on sensitive newborn skin.',
    sizes: ['0-3 Months', '3-6 Months', '6-12 Months'],
    category: 'Newborn',
    rating: 4.8,
    reviewsCount: 72,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfcSmwL966fdbtPjWJf97yHwoAPso--XpFPExIM5T5GYg0XTQgczEhJi2uoRq2gPXRIBs87GFW6JWzFCiODAw_vzQw2RW5nea-uvJUV1_MkbT01cjrJqV30eNigdaWaRFgBjU2hFo6twONX8_Ibz01knXgKGbms3W0u5UeB1qbqq3tHKwjuoUFdAEZaj27zt24H_0_gwc31PTdpJQYyC1LLt1wgNwd060RuEyNAee-LmTWOMVjwVPztCFOxeiDk1h8c6LcCjsBKtrM'
    ]
  },
  {
    id: 'cloud-knit-bonnet',
    name: 'Cloud Knit Bonnet',
    price: 6.50,
    originalPrice: 8.00,
    colorName: 'Ivory',
    colorHex: '#FAF5EF',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkJd4UzZc6LQwAJlrNZWfl7-JCSaIXhcbFIqyTdeAIRRx3yCq9mt959TNdSr4v4yj25dwwGDsYjH1ivFR5OIV1JEis3jOmEsu88AVookNjVSWekGKOv5TZ1iSt4dQO3x31w3x_UmAlZnih6ddlWupGxLpFrAG05Q-cYoqDbsjH7qPDk4boP8fYOsR4_WHQsv2cmt-oqNMlovu71KQukfX0dcHKW14iLmLTQle-XtEBKNE9YfhpAIoDZdaVoIoYu1-hfyCguF2Kiyn5',
    description: 'A cozy cloud-soft knit bonnet with adorable bear ear details and snug chin-ties for custom warmth.',
    sizes: ['One Size'],
    category: 'Knitwear',
    rating: 4.9,
    reviewsCount: 41,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAkJd4UzZc6LQwAJlrNZWfl7-JCSaIXhcbFIqyTdeAIRRx3yCq9mt959TNdSr4v4yj25dwwGDsYjH1ivFR5OIV1JEis3jOmEsu88AVookNjVSWekGKOv5TZ1iSt4dQO3x31w3x_UmAlZnih6ddlWupGxLpFrAG05Q-cYoqDbsjH7qPDk4boP8fYOsR4_WHQsv2cmt-oqNMlovu71KQukfX0dcHKW14iLmLTQle-XtEBKNE9YfhpAIoDZdaVoIoYu1-hfyCguF2Kiyn5'
    ]
  },
  {
    id: 'waffle-sleep-set',
    name: 'Waffle Sleep Set',
    price: 12.00,
    originalPrice: 14.50,
    colorName: 'Lavender',
    colorHex: '#C3B1E1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbBv3nOGzq7bFvX3Br0GVsFuXowAqjD-EroPoThy1vsZfRB6ybDiJ7hg8qC194ZZpwf1YT7gnFW5niLNNgYusnIYlJAY20182RUtamDUXxLJtfzbdDJBF92sPQqrnMr1iklogLLqxxwXigD9s_cXViLe_dOFvWFnenHfLuPOX5H2W47p2EyhyJ55FjDNsiQiW3A4H7cSm9SEfxJJqABFhA2GrFOQxviQB0sh8oVf_Y5LaP5OG9ylAl5w5Cy2sGADKF52ORaptJ2tGq',
    description: 'Delightful matching waffle-woven sleep set featuring a sleepy cap, toy, and pants. Warm yet fully breathable.',
    sizes: ['3-6 Months', '6-12 Months'],
    category: 'Organic Cotton',
    rating: 4.7,
    reviewsCount: 68,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbBv3nOGzq7bFvX3Br0GVsFuXowAqjD-EroPoThy1vsZfRB6ybDiJ7hg8qC194ZZpwf1YT7gnFW5niLNNgYusnIYlJAY20182RUtamDUXxLJtfzbdDJBF92sPQqrnMr1iklogLLqxxwXigD9s_cXViLe_dOFvWFnenHfLuPOX5H2W47p2EyhyJ55FjDNsiQiW3A4H7cSm9SEfxJJqABFhA2GrFOQxviQB0sh8oVf_Y5LaP5OG9ylAl5w5Cy2sGADKF52ORaptJ2tGq'
    ]
  },
  {
    id: 'soft-sole-moccasins',
    name: 'Soft Sole Moccasins',
    price: 8.00,
    originalPrice: 11.00,
    colorName: 'Cinnamon',
    colorHex: '#8B5A2B',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlqb_VGZ3q678UgFMlv4wfe669ZxFRcJUWNitHVN9l3DNyohUxN-9Nc9XzR270K7lPiZMo688nURhq9d0DsoCUXrZl8zq4U6hF1o0xFTB_6S85JHHfbcG6NjNEdx3JBI---6JluoBFGs-KuBfjXK-zJeh7aXr7rbfzqcJOjo3YnlW730gvmnXG96XFc1r2hHERB1UA3ENJUwTBQ94DRla7Q8VN85uqjt_WysEhTHii6qbLDNvS6NNXNf30hiaH0y0DJzXuzy_w-TgY',
    description: 'Charming fringe moccasins made of durable cinnamon colored leather with soft soles, promoting healthy foot growth.',
    sizes: ['One Size'],
    category: 'Accessories',
    rating: 4.8,
    reviewsCount: 39,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBlqb_VGZ3q678UgFMlv4wfe669ZxFRcJUWNitHVN9l3DNyohUxN-9Nc9XzR270K7lPiZMo688nURhq9d0DsoCUXrZl8zq4U6hF1o0xFTB_6S85JHHfbcG6NjNEdx3JBI---6JluoBFGs-KuBfjXK-zJeh7aXr7rbfzqcJOjo3YnlW730gvmnXG96XFc1r2hHERB1UA3ENJUwTBQ94DRla7Q8VN85uqjt_WysEhTHii6qbLDNvS6NNXNf30hiaH0y0DJzXuzy_w-TgY'
    ]
  },
  {
    id: 'hooded-knit-sweater',
    name: 'Hooded Knit Sweater',
    price: 14.00,
    originalPrice: 15.00,
    colorName: 'Sage Green',
    colorHex: '#D1E2D1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxenHuvEYN9riujxorLHfYQ8Ni8eFXD7rnRTD0sJO5ycbcMdvJW-T8-ycWi1YSSttMs825bry7MXy_HpEI_7jYCEXyKMX2xgH0c8Np6ccbq8Ke09Oz1pG8Xzmtc3AtzUM67Jp98a7CgaFTvaZi5-EFY5Y21o0_mL0kitU8jIrM1xyNODl5McZTL_aN5yNPOHcSZKuP0iVjCqZNac4B3Usc5WxI438NSueUf4mLLBnquxvvG88zzRkvLoX5MIgqMIWYMJ_DsuUNpmn0',
    description: 'A cozy hooded knit sweater featuring a premium wooden button closure. Handcrafted with extra care for chilly days.',
    sizes: ['0-3 Months', '3-6 Months', '6-12 Months'],
    category: 'Knitwear',
    isNew: true,
    rating: 4.9,
    reviewsCount: 38,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCxenHuvEYN9riujxorLHfYQ8Ni8eFXD7rnRTD0sJO5ycbcMdvJW-T8-ycWi1YSSttMs825bry7MXy_HpEI_7jYCEXyKMX2xgH0c8Np6ccbq8Ke09Oz1pG8Xzmtc3AtzUM67Jp98a7CgaFTvaZi5-EFY5Y21o0_mL0kitU8jIrM1xyNODl5McZTL_aN5yNPOHcSZKuP0iVjCqZNac4B3Usc5WxI438NSueUf4mLLBnquxvvG88zzRkvLoX5MIgqMIWYMJ_DsuUNpmn0'
    ]
  },
  {
    id: 'pocket-organic-tee',
    name: 'Pocket Organic Tee',
    price: 7.50,
    originalPrice: 9.00,
    colorName: 'Sand Melange',
    colorHex: '#E5D3C5',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwjz9nVRxOVfIppOHIKVOgtBbpVDhYIp32G8F4Yje6HLf1fMwhdCWUksSnSijP8pYsomt4kdQquJqKNHvx1FPR6jdFO3YC3gZEVlrNJLnFeZuivyB_XbfdGn5kJzw9xoEPEsB6O4iGURgQfW2cBxqGkiL5-sdNBLZHfKXFy7_aqvWVJXV-Rj9WnbokFO92lh788Grvj-FwY6F16ZUv5tKGHO0CVGuf5tbJg1xsli13Bqr_qA-gGZUZ6QnNhH6Zd0RSw7lkub_6RrUA',
    description: 'Ultra-light organic jersey tee with a cute chest pocket. Breathable, stretchy, and incredibly easy to style.',
    sizes: ['3-6 Months', '6-12 Months'],
    category: 'Organic Cotton',
    rating: 4.7,
    reviewsCount: 22,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDwjz9nVRxOVfIppOHIKVOgtBbpVDhYIp32G8F4Yje6HLf1fMwhdCWUksSnSijP8pYsomt4kdQquJqKNHvx1FPR6jdFO3YC3gZEVlrNJLnFeZuivyB_XbfdGn5kJzw9xoEPEsB6O4iGURgQfW2cBxqGkiL5-sdNBLZHfKXFy7_aqvWVJXV-Rj9WnbokFO92lh788Grvj-FwY6F16ZUv5tKGHO0CVGuf5tbJg1xsli13Bqr_qA-gGZUZ6QnNhH6Zd0RSw7lkub_6RrUA'
    ]
  },
  {
    id: 'relaxed-linen-romper',
    name: 'Relaxed Linen Romper',
    price: 12.50,
    originalPrice: 15.00,
    colorName: 'Caramel',
    colorHex: '#C59B74',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTilFEuQyCN3jA2VTMEKk4QQJy9SltxlwP2y0EB2TICGQ7SaNcvC5n3FSXI3JctVHg-Dhwb4tbPsz6Kes0q8p2KHpub26jXxG3pEYd0II8Iyj06Bl5jjIta32Jgk63HB1PFbsMAtsbgSrc5aFCA9yVY1EVWFqpxFkRpmylJBEG0B0jryGEy-3OZVJWEJDd_mh1xG-1alvVF0R1KWmt1POvkPqm32_AFv1SaFueGtpQ4ed8UnOUiEpoOtlBR5k63ZsogcjXUUpv4ABU',
    description: 'A loose, organic linen blend romper featuring elastic leg holes and practical bottom snap fasteners.',
    sizes: ['0-3 Months', '3-6 Months', '6-12 Months'],
    category: 'Newborn',
    rating: 4.5,
    reviewsCount: 15,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTilFEuQyCN3jA2VTMEKk4QQJy9SltxlwP2y0EB2TICGQ7SaNcvC5n3FSXI3JctVHg-Dhwb4tbPsz6Kes0q8p2KHpub26jXxG3pEYd0II8Iyj06Bl5jjIta32Jgk63HB1PFbsMAtsbgSrc5aFCA9yVY1EVWFqpxFkRpmylJBEG0B0jryGEy-3OZVJWEJDd_mh1xG-1alvVF0R1KWmt1POvkPqm32_AFv1SaFueGtpQ4ed8UnOUiEpoOtlBR5k63ZsogcjXUUpv4ABU'
    ]
  },
  {
    id: 'knitted-pom-beanie',
    name: 'Knitted Pom Beanie',
    price: 5.50,
    originalPrice: 7.00,
    colorName: 'Ivory',
    colorHex: '#FCF9F2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkJd4UzZc6LQwAJlrNZWfl7-JCSaIXhcbFIqyTdeAIRRx3yCq9mt959TNdSr4v4yj25dwwGDsYjH1ivFR5OIV1JEis3jOmEsu88AVookNjVSWekGKOv5TZ1iSt4dQO3x31w3x_UmAlZnih6ddlWupGxLpFrAG05Q-cYoqDbsjH7qPDk4boP8fYOsR4_WHQsv2cmt-oqNMlovu71KQukfX0dcHKW14iLmLTQle-XtEBKNE9YfhpAIoDZdaVoIoYu1-hfyCguF2Kiyn5',
    description: 'Adorable cotton knit beanie topped with a soft, cloud-like yarn pom-pom. Keeps ears perfectly protected.',
    sizes: ['One Size'],
    category: 'Knitwear',
    isBestSeller: true,
    rating: 4.8,
    reviewsCount: 64,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAkJd4UzZc6LQwAJlrNZWfl7-JCSaIXhcbFIqyTdeAIRRx3yCq9mt959TNdSr4v4yj25dwwGDsYjH1ivFR5OIV1JEis3jOmEsu88AVookNjVSWekGKOv5TZ1iSt4dQO3x31w3x_UmAlZnih6ddlWupGxLpFrAG05Q-cYoqDbsjH7qPDk4boP8fYOsR4_WHQsv2cmt-oqNMlovu71KQukfX0dcHKW14iLmLTQle-XtEBKNE9YfhpAIoDZdaVoIoYu1-hfyCguF2Kiyn5'
    ]
  },
  {
    id: 'cloud-sleeping-sack',
    name: 'Cloud Sleeping Sack',
    price: 15.00,
    originalPrice: 15.00,
    colorName: 'Ivory Bloom',
    colorHex: '#FCF9F2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfX6atPiG7zSs3J3eed1GPece0cctgDFf3W2Epw3KcxgmkGROGy1bHwLb5nTKkRBHJ636HPe8cDkdj6ploRrkI93g7vWkcDcjqllzeaAv9Gn74-78_x4nmFqLR8m22dgjrtPv4SyIugodRP2EPvOIjnmVc17fybVfJABq6AzU9KdYuBSJdsHKpPZx7NHkI05z12t63N-_4wm7cQdlf0aWYt3lSrVg5oGRTZi8mOw_s4K-cAUwi8nBS70JPwjyAomZ5_dh4x1nB3lDj',
    description: 'A breathable sleeping sack made from double-layered organic muslin cotton to ensure safe and cozy slumber.',
    sizes: ['0-3 Months', '3-6 Months', '6-12 Months'],
    category: 'Organic Cotton',
    rating: 4.9,
    reviewsCount: 50,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfX6atPiG7zSs3J3eed1GPece0cctgDFf3W2Epw3KcxgmkGROGy1bHwLb5nTKkRBHJ636HPe8cDkdj6ploRrkI93g7vWkcDcjqllzeaAv9Gn74-78_x4nmFqLR8m22dgjrtPv4SyIugodRP2EPvOIjnmVc17fybVfJABq6AzU9KdYuBSJdsHKpPZx7NHkI05z12t63N-_4wm7cQdlf0aWYt3lSrVg5oGRTZi8mOw_s4K-cAUwi8nBS70JPwjyAomZ5_dh4x1nB3lDj'
    ]
  },
  {
    id: 'cozy-footed-pajamas',
    name: 'Cozy Footed Pajamas',
    price: 13.50,
    originalPrice: 15.00,
    colorName: 'Sand Melange',
    colorHex: '#E5D3C5',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwjz9nVRxOVfIppOHIKVOgtBbpVDhYIp32G8F4Yje6HLf1fMwhdCWUksSnSijP8pYsomt4kdQquJqKNHvx1FPR6jdFO3YC3gZEVlrNJLnFeZuivyB_XbfdGn5kJzw9xoEPEsB6O4iGURgQfW2cBxqGkiL5-sdNBLZHfKXFy7_aqvWVJXV-Rj9WnbokFO92lh788Grvj-FwY6F16ZUv5tKGHO0CVGuf5tbJg1xsli13Bqr_qA-gGZUZ6QnNhH6Zd0RSw7lkub_6RrUA',
    description: 'Full-length organic pajamas with cozy enclosed feet and an easy two-way zipper for quick middle-of-the-night changes.',
    sizes: ['0-3 Months', '3-6 Months', '6-12 Months'],
    category: 'Newborn',
    isNew: true,
    rating: 4.7,
    reviewsCount: 47,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDwjz9nVRxOVfIppOHIKVOgtBbpVDhYIp32G8F4Yje6HLf1fMwhdCWUksSnSijP8pYsomt4kdQquJqKNHvx1FPR6jdFO3YC3gZEVlrNJLnFeZuivyB_XbfdGn5kJzw9xoEPEsB6O4iGURgQfW2cBxqGkiL5-sdNBLZHfKXFy7_aqvWVJXV-Rj9WnbokFO92lh788Grvj-FwY6F16ZUv5tKGHO0CVGuf5tbJg1xsli13Bqr_qA-gGZUZ6QnNhH6Zd0RSw7lkub_6RrUA'
    ]
  },
  {
    id: 'organic-mittens-set',
    name: 'Organic Mittens Set',
    price: 4.50,
    originalPrice: 6.00,
    colorName: 'Sage Green',
    colorHex: '#D1E2D1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxenHuvEYN9riujxorLHfYQ8Ni8eFXD7rnRTD0sJO5ycbcMdvJW-T8-ycWi1YSSttMs825bry7MXy_HpEI_7jYCEXyKMX2xgH0c8Np6ccbq8Ke09Oz1pG8Xzmtc3AtzUM67Jp98a7CgaFTvaZi5-EFY5Y21o0_mL0kitU8jIrM1xyNODl5McZTL_aN5yNPOHcSZKuP0iVjCqZNac4B3Usc5WxI438NSueUf4mLLBnquxvvG88zzRkvLoX5MIgqMIWYMJ_DsuUNpmn0',
    description: 'Set of three matching anti-scratch baby mittens made from organic combed cotton with extremely soft wrist bands.',
    sizes: ['One Size'],
    category: 'Accessories',
    rating: 4.6,
    reviewsCount: 19,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCxenHuvEYN9riujxorLHfYQ8Ni8eFXD7rnRTD0sJO5ycbcMdvJW-T8-ycWi1YSSttMs825bry7MXy_HpEI_7jYCEXyKMX2xgH0c8Np6ccbq8Ke09Oz1pG8Xzmtc3AtzUM67Jp98a7CgaFTvaZi5-EFY5Y21o0_mL0kitU8jIrM1xyNODl5McZTL_aN5yNPOHcSZKuP0iVjCqZNac4B3Usc5WxI438NSueUf4mLLBnquxvvG88zzRkvLoX5MIgqMIWYMJ_DsuUNpmn0'
    ]
  },
  {
    id: 'wooden-teether-ring',
    name: 'Wooden Teether Ring',
    price: 6.00,
    originalPrice: 8.00,
    colorName: 'Sand Melange',
    colorHex: '#E5D3C5',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSv0Ek0r5kYfYnsGx0aWOVvqP15Sl0-uV3ibNasfB3CJQGrUgBERd4QIXYo420wxAbhrdsTgoMmeRG1l5LHy7kFmUU6GfyASwtC2ZgDgrTiLug-faJdPnzfIW2tYqniXoI9K30oICcxpsHWSOUC3ngKPF_BxMzeZm4jINcbg1t0aYFmh9trdDk-zVwh3oH9iORaIsEOl5KD6BRVRiHcswQO7dckfmDAP7KJWZSTiOBet0sHh4i919_ohQe7lwEk9W9KsxHlzI18SM5',
    description: 'Natural solid maple wood teether ring wrapped in fluffy double-layered organic cotton bunny ears.',
    sizes: ['One Size'],
    category: 'Accessories',
    rating: 4.8,
    reviewsCount: 31,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCSv0Ek0r5kYfYnsGx0aWOVvqP15Sl0-uV3ibNasfB3CJQGrUgBERd4QIXYo420wxAbhrdsTgoMmeRG1l5LHy7kFmUU6GfyASwtC2ZgDgrTiLug-faJdPnzfIW2tYqniXoI9K30oICcxpsHWSOUC3ngKPF_BxMzeZm4jINcbg1t0aYFmh9trdDk-zVwh3oH9iORaIsEOl5KD6BRVRiHcswQO7dckfmDAP7KJWZSTiOBet0sHh4i919_ohQe7lwEk9W9KsxHlzI18SM5'
    ]
  },
  {
    id: 'bamboo-cotton-swaddle',
    name: 'Bamboo Cotton Swaddle',
    price: 11.00,
    originalPrice: 13.00,
    colorName: 'Lavender',
    colorHex: '#C3B1E1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbBv3nOGzq7bFvX3Br0GVsFuXowAqjD-EroPoThy1vsZfRB6ybDiJ7hg8qC194ZZpwf1YT7gnFW5niLNNgYusnIYlJAY20182RUtamDUXxLJtfzbdDJBF92sPQqrnMr1iklogLLqxxwXigD9s_cXViLe_dOFvWFnenHfLuPOX5H2W47p2EyhyJ55FjDNsiQiW3A4H7cSm9SEfxJJqABFhA2GrFOQxviQB0sh8oVf_Y5LaP5OG9ylAl5w5Cy2sGADKF52ORaptJ2tGq',
    description: 'An incredibly light, silky swaddle blanket blended from organic cotton and natural bamboo fibers.',
    sizes: ['One Size'],
    category: 'Organic Cotton',
    isNew: true,
    rating: 4.9,
    reviewsCount: 55,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbBv3nOGzq7bFvX3Br0GVsFuXowAqjD-EroPoThy1vsZfRB6ybDiJ7hg8qC194ZZpwf1YT7gnFW5niLNNgYusnIYlJAY20182RUtamDUXxLJtfzbdDJBF92sPQqrnMr1iklogLLqxxwXigD9s_cXViLe_dOFvWFnenHfLuPOX5H2W47p2EyhyJ55FjDNsiQiW3A4H7cSm9SEfxJJqABFhA2GrFOQxviQB0sh8oVf_Y5LaP5OG9ylAl5w5Cy2sGADKF52ORaptJ2tGq'
    ]
  },
  {
    id: 'knitted-baby-suspenders',
    name: 'Knitted Baby Suspenders',
    price: 9.50,
    originalPrice: 12.00,
    colorName: 'Caramel',
    colorHex: '#C59B74',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAI6hENwHFcEhldc-NZ8iUdWbChP9bmVxlMRqX_gV4gM5NY8i0dn4q0TXsSaXlZA_hH_R6a2XT6Y_B_rIQ3mPrbL2erYR8v_ulwyiBnPbb-LgS7ggElY9g9OjhAkl4aVmxwCUtFYn3hxE3oNCXhZtJwZoU-g1dlWKtcty3mIWZ6DiUTslPAZsj787pn4Zn9K8oIojvOCABAQuv8xQl4VoITWd4GKRNR0V0oEmrG5qSX9hRIydvj2o3clg1RFrySJYHXLuBB7vP3RcC',
    description: 'Charming vintage-style knit tights with secure straps. Elastic waistband keeps them comfortably on hips.',
    sizes: ['3-6 Months', '6-12 Months'],
    category: 'Knitwear',
    rating: 4.6,
    reviewsCount: 14,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCAI6hENwHFcEhldc-NZ8iUdWbChP9bmVxlMRqX_gV4gM5NY8i0dn4q0TXsSaXlZA_hH_R6a2XT6Y_B_rIQ3mPrbL2erYR8v_ulwyiBnPbb-LgS7ggElY9g9OjhAkl4aVmxwCUtFYn3hxE3oNCXhZtJwZoU-g1dlWKtcty3mIWZ6DiUTslPAZsj787pn4Zn9K8oIojvOCABAQuv8xQl4VoITWd4GKRNR0V0oEmrG5qSX9hRIydvj2o3clg1RFrySJYHXLuBB7vP3RcC'
    ]
  },
  {
    id: 'ribbed-sleeveless-bodysuit',
    name: 'Ribbed Sleeveless Bodysuit',
    price: 8.00,
    originalPrice: 10.00,
    colorName: 'Soft Mint',
    colorHex: '#A0D6B4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDajus6WTMaGCz7faosiwQ7BsOOxFyrKbuH2l7rBWsZRaCiKbmllFoNmGKGGuWZEOPh2IR0rnbQmXVZoyaDsOQzUJ0Z1zfPWfHarVjj32Mc-jnr_XENqSCJlfDK7MpSLB2QI05k3BBqNA-0KH6cZCQ0R8c-kljmqRIMgZjUYzUzPQZeCxn6_TwZLHoX0LySIGSDwRH8ekhFuAEWwT-hra-_FQYUwkBXyp5WNoaoxqqXQetQXX6FW5rZXG6rx3wCc3Qh8D9ZUlNrDcT',
    description: 'A light, sleeveless ribbed bodysuit with premium organic fibers, ideal for warm weather or layered underneath outfits.',
    sizes: ['0-3 Months', '3-6 Months', '6-12 Months'],
    category: 'Newborn',
    rating: 4.8,
    reviewsCount: 43,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBDajus6WTMaGCz7faosiwQ7BsOOxFyrKbuH2l7rBWsZRaCiKbmllFoNmGKGGuWZEOPh2IR0rnbQmXVZoyaDsOQzUJ0Z1zfPWfHarVjj32Mc-jnr_XENqSCJlfDK7MpSLB2QI05k3BBqNA-0KH6cZCQ0R8c-kljmqRIMgZjUYzUzPQZeCxn6_TwZLHoX0LySIGSDwRH8ekhFuAEWwT-hra-_FQYUwkBXyp5WNoaoxqqXQetQXX6FW5rZXG6rx3wCc3Qh8D9ZUlNrDcT'
    ]
  },
  {
    id: 'quilted-play-mat',
    name: 'Quilted Play Mat',
    price: 15.00,
    originalPrice: 15.00,
    colorName: 'Sage Green',
    colorHex: '#D1E2D1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfX6atPiG7zSs3J3eed1GPece0cctgDFf3W2Epw3KcxgmkGROGy1bHwLb5nTKkRBHJ636HPe8cDkdj6ploRrkI93g7vWkcDcjqllzeaAv9Gn74-78_x4nmFqLR8m22dgjrtPv4SyIugodRP2EPvOIjnmVc17fybVfJABq6AzU9KdYuBSJdsHKpPZx7NHkI05z12t63N-_4wm7cQdlf0aWYt3lSrVg5oGRTZi8mOw_s4K-cAUwi8nBS70JPwjyAomZ5_dh4x1nB3lDj',
    description: 'Extra thick quilted play mat crafted from 100% GOTS organic cotton to provide an ultra-safe and cushiony tummy time space.',
    sizes: ['One Size'],
    category: 'Accessories',
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 77,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfX6atPiG7zSs3J3eed1GPece0cctgDFf3W2Epw3KcxgmkGROGy1bHwLb5nTKkRBHJ636HPe8cDkdj6ploRrkI93g7vWkcDdj6ploRrkI93g7vWkcDcjqllzeaAv9Gn74-78_x4nmFqLR8m22dgjrtPv4SyIugodRP2EPvOIjnmVc17fybVfJABq6AzU9KdYuBSJdsHKpPZx7NHkI05z12t63N-_4wm7cQdlf0aWYt3lSrVg5oGRTZi8mOw_s4K-cAUwi8nBS70JPwjyAomZ5_dh4x1nB3lDj'
    ]
  },
  {
    id: 'muslin-comforter-toy',
    name: 'Muslin Comforter Toy',
    price: 7.00,
    originalPrice: 9.00,
    colorName: 'Sand Melange',
    colorHex: '#E5D3C5',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSv0Ek0r5kYfYnsGx0aWOVvqP15Sl0-uV3ibNasfB3CJQGrUgBERd4QIXYo420wxAbhrdsTgoMmeRG1l5LHy7kFmUU6GfyASwtC2ZgDgrTiLug-faJdPnzfIW2tYqniXoI9K30oICcxpsHWSOUC3ngKPF_BxMzeZm4jINcbg1t0aYFmh9trdDk-zVwh3oH9iORaIsEOl5KD6BRVRiHcswQO7dckfmDAP7KJWZSTiOBet0sHh4i919_ohQe7lwEk9W9KsxHlzI18SM5',
    description: 'A beautiful organic cotton muslin security blanket attached to a sleepy wooden animal shape. Soft to cuddle.',
    sizes: ['One Size'],
    category: 'Accessories',
    rating: 4.7,
    reviewsCount: 26,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCSv0Ek0r5kYfYnsGx0aWOVvqP15Sl0-uV3ibNasfB3CJQGrUgBERd4QIXYo420wxAbhrdsTgoMmeRG1l5LHy7kFmUU6GfyASwtC2ZgDgrTiLug-faJdPnzfIW2tYqniXoI9K30oICcxpsHWSOUC3ngKPF_BxMzeZm4jINcbg1t0aYFmh9trdDk-zVwh3oH9iORaIsEOl5KD6BRVRiHcswQO7dckfmDAP7KJWZSTiOBet0sHh4i919_ohQe7lwEk9W9KsxHlzI18SM5'
    ]
  },
  {
    id: 'cable-knit-cardigan',
    name: 'Cable Knit Cardigan',
    price: 14.50,
    originalPrice: 15.00,
    colorName: 'Sage Green',
    colorHex: '#D1E2D1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxenHuvEYN9riujxorLHfYQ8Ni8eFXD7rnRTD0sJO5ycbcMdvJW-T8-ycWi1YSSttMs825bry7MXy_HpEI_7jYCEXyKMX2xgH0c8Np6ccbq8Ke09Oz1pG8Xzmtc3AtzUM67Jp98a7CgaFTvaZi5-EFY5Y21o0_mL0kitU8jIrM1xyNODl5McZTL_aN5yNPOHcSZKuP0iVjCqZNac4B3Usc5WxI438NSueUf4mLLBnquxvvG88zzRkvLoX5MIgqMIWYMJ_DsuUNpmn0',
    description: 'Premium heavy weight organic cotton cardigan featuring complex cable patterns and classic wooden toggle buttons.',
    sizes: ['3-6 Months', '6-12 Months'],
    category: 'Knitwear',
    isNew: true,
    rating: 4.9,
    reviewsCount: 33,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCxenHuvEYN9riujxorLHfYQ8Ni8eFXD7rnRTD0sJO5ycbcMdvJW-T8-ycWi1YSSttMs825bry7MXy_HpEI_7jYCEXyKMX2xgH0c8Np6ccbq8Ke09Oz1pG8Xzmtc3AtzUM67Jp98a7CgaFTvaZi5-EFY5Y21o0_mL0kitU8jIrM1xyNODl5McZTL_aN5yNPOHcSZKuP0iVjCqZNac4B3Usc5WxI438NSueUf4mLLBnquxvvG88zzRkvLoX5MIgqMIWYMJ_DsuUNpmn0'
    ]
  },
  {
    id: 'organic-jersey-shorts',
    name: 'Organic Jersey Shorts',
    price: 6.50,
    originalPrice: 8.50,
    colorName: 'Caramel',
    colorHex: '#C59B74',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDLiI3MbTFp5w6yKZptWIIBNA7zo6dUiODF_YpvZX3rJm-sGxlofwmnBDO670pInDn321GEn7GZGsO1BxT6MZW-eMQqo1xEZU1dkpFUNZGKtJZaj2bWhsxlEfpGJ2yVV9G5RLCAsVsCE641YWLVFISieYbowwNem4RrZhje9LKgHCF13o_oF6TbJxOZsVXMt1FgA6ZIz7hz1QxF4zP4_BxBq0LfF-zebDJ1vC0acGRdSgDnDx5kj-wg6cVa_vLhJpgGQXDQxQKgaYF',
    description: 'Lightweight organic jersey knit shorts featuring a mock tie waist. Elastic band prevents digging.',
    sizes: ['3-6 Months', '6-12 Months'],
    category: 'Organic Cotton',
    rating: 4.5,
    reviewsCount: 20,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDLiI3MbTFp5w6yKZptWIIBNA7zo6dUiODF_YpvZX3rJm-sGxlofwmnBDO670pInDn321GEn7GZGsO1BxT6MZW-eMQqo1xEZU1dkpFUNZGKtJZaj2bWhsxlEfpGJ2yVV9G5RLCAsVsCE641YWLVFISieYbowwNem4RrZhje9LKgHCF13o_oF6TbJxOZsVXMt1FgA6ZIz7hz1QxF4zP4_BxBq0LfF-zebDJ1vC0acGRdSgDnDx5kj-wg6cVa_vLhJpgGQXDQxQKgaYF'
    ]
  },
  {
    id: 'pointelle-cotton-onesie',
    name: 'Pointelle Cotton Onesie',
    price: 10.50,
    originalPrice: 12.00,
    colorName: 'Ivory',
    colorHex: '#FCF9F2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfX6atPiG7zSs3J3eed1GPece0cctgDFf3W2Epw3KcxgmkGROGy1bHwLb5nTKkRBHJ636HPe8cDkdj6ploRrkI93g7vWkcDcjqllzeaAv9Gn74-78_x4nmFqLR8m22dgjrtPv4SyIugodRP2EPvOIjnmVc17fybVfJABq6AzU9KdYuBSJdsHKpPZx7NHkI05z12t63N-_4wm7cQdlf0aWYt3lSrVg5oGRTZi8mOw_s4K-cAUwi8nBS70JPwjyAomZ5_dh4x1nB3lDj',
    description: 'Lovely pointelle-woven baby onesie with delicate open-work patterns. Exceptionally lightweight and soft.',
    sizes: ['0-3 Months', '3-6 Months', '6-12 Months'],
    category: 'Newborn',
    rating: 4.8,
    reviewsCount: 29,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfX6atPiG7zSs3J3eed1GPece0cctgDFf3W2Epw3KcxgmkGROGy1bHwLb5nTKkRBHJ636HPe8cDkdj6ploRrkI93g7vWkcDcjqllzeaAv9Gn74-78_x4nmFqLR8m22dgjrtPv4SyIugodRP2EPvOIjnmVc17fybVfJABq6AzU9KdYuBSJdsHKpPZx7NHkI05z12t63N-_4wm7cQdlf0aWYt3lSrVg5oGRTZi8mOw_s4K-cAUwi8nBS70JPwjyAomZ5_dh4x1nB3lDj'
    ]
  },
  {
    id: 'knit-booties-sand',
    name: 'Knit Booties Sand',
    price: 8.50,
    originalPrice: 10.00,
    colorName: 'Sand Melange',
    colorHex: '#E5D3C5',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlqb_VGZ3q678UgFMlv4wfe669ZxFRcJUWNitHVN9l3DNyohUxN-9Nc9XzR270K7lPiZMo688nURhq9d0DsoCUXrZl8zq4U6hF1o0xFTB_6S85JHHfbcG6NjNEdx3JBI---6JluoBFGs-KuBfjXK-zJeh7aXr7rbfzqcJOjo3YnlW730gvmnXG96XFc1r2hHERB1UA3ENJUwTBQ94DRla7Q8VN85uqjt_WysEhTHii6qbLDNvS6NNXNf30hiaH0y0DJzXuzy_w-TgY',
    description: 'Soft hand-knitted newborn booties with delicate rib-knit ankles to ensure they stay on tiny kicks.',
    sizes: ['One Size'],
    category: 'Knitwear',
    isBestSeller: true,
    rating: 4.7,
    reviewsCount: 32,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBlqb_VGZ3q678UgFMlv4wfe669ZxFRcJUWNitHVN9l3DNyohUxN-9Nc9XzR270K7lPiZMo688nURhq9d0DsoCUXrZl8zq4U6hF1o0xFTB_6S85JHHfbcG6NjNEdx3JBI---6JluoBFGs-KuBfjXK-zJeh7aXr7rbfzqcJOjo3YnlW730gvmnXG96XFc1r2hHERB1UA3ENJUwTBQ94DRla7Q8VN85uqjt_WysEhTHii6qbLDNvS6NNXNf30hiaH0y0DJzXuzy_w-TgY'
    ]
  },
  {
    id: 'muslin-feeding-bib',
    name: 'Muslin Feeding Bib',
    price: 5.00,
    originalPrice: 6.50,
    colorName: 'Lavender',
    colorHex: '#C3B1E1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5aIOsCtlptr654sr9GLOvGUfH4fqdWGv5iRIbYOx37FEwVvR221YusKt8E2Fj-xfEmALa1Lq5uKDd7GZNylrw2zNBuweI-5WHgAmPxNW5Uy6heyfJ6fKxqwEIkUZ18VEPfUdt6KIH0M_rZaOI3ZxWeD3XMVCB9lctsbyx5zHiZ3QS8TqTNr7n0D9gz0cC8jKEEo5EWXAHlKzpo27k26eBRxi0EpK-aloTKInAUCF32cLZJTPz8-JEezVpkqNGk5XCv1G6JDdeuoUq',
    description: 'A beautifully soft muslin feeding bib featuring four highly absorbent organic layers and snap backing.',
    sizes: ['One Size'],
    category: 'Accessories',
    rating: 4.6,
    reviewsCount: 21,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5aIOsCtlptr654sr9GLOvGUfH4fqdWGv5iRIbYOx37FEwVvR221YusKt8E2Fj-xfEmALa1Lq5uKDd7GZNylrw2zNBuweI-5WHgAmPxNW5Uy6heyfJ6fKxqwEIkUZ18VEPfUdt6KIH0M_rZaOI3ZxWeD3XMVCB9lctsbyx5zHiZ3QS8TqTNr7n0D9gz0cC8jKEEo5EWXAHlKzpo27k26eBRxi0EpK-aloTKInAUCF32cLZJTPz8-JEezVpkqNGk5XCv1G6JDdeuoUq'
    ]
  },
  {
    id: 'ribbed-lounge-leggings',
    name: 'Ribbed Lounge Leggings',
    price: 7.00,
    originalPrice: 9.50,
    colorName: 'Sage Green',
    colorHex: '#D1E2D1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDLiI3MbTFp5w6yKZptWIIBNA7zo6dUiODF_YpvZX3rJm-sGxlofwmnBDO670pInDn321GEn7GZGsO1BxT6MZW-eMQqo1xEZU1dkpFUNZGKtJZaj2bWhsxlEfpGJ2yVV9G5RLCAsVsCE641YWLVFISieYbowwNem4RrZhje9LKgHCF13o_oF6TbJxOZsVXMt1FgA6ZIz7hz1QxF4zP4_BxBq0LfF-zebDJ1vC0acGRdSgDnDx5kj-wg6cVa_vLhJpgGQXDQxQKgaYF',
    description: 'Comfortable ribbed knit leggings made from signature GOTS cotton. Highly flexible, airy, and easy to wash.',
    sizes: ['0-3 Months', '3-6 Months', '6-12 Months'],
    category: 'Organic Cotton',
    rating: 4.8,
    reviewsCount: 45,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDLiI3MbTFp5w6yKZptWIIBNA7zo6dUiODF_YpvZX3rJm-sGxlofwmnBDO670pInDn321GEn7GZGsO1BxT6MZW-eMQqo1xEZU1dkpFUNZGKtJZaj2bWhsxlEfpGJ2yVV9G5RLCAsVsCE641YWLVFISieYbowwNem4RrZhje9LKgHCF13o_oF6TbJxOZsVXMt1FgA6ZIz7hz1QxF4zP4_BxBq0LfF-zebDJ1vC0acGRdSgDnDx5kj-wg6cVa_vLhJpgGQXDQxQKgaYF'
    ]
  },
  {
    id: 'cloud-quilted-beanie',
    name: 'Cloud Quilted Beanie',
    price: 6.00,
    originalPrice: 8.00,
    colorName: 'Soft Mint',
    colorHex: '#A0D6B4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkJd4UzZc6LQwAJlrNZWfl7-JCSaIXhcbFIqyTdeAIRRx3yCq9mt959TNdSr4v4yj25dwwGDsYjH1ivFR5OIV1JEis3jOmEsu88AVookNjVSWekGKOv5TZ1iSt4dQO3x31w3x_UmAlZnih6ddlWupGxLpFrAG05Q-cYoqDbsjH7qPDk4boP8fYOsR4_WHQsv2cmt-oqNMlovu71KQukfX0dcHKW14iLmLTQle-XtEBKNE9YfhpAIoDZdaVoIoYu1-hfyCguF2Kiyn5',
    description: 'Double-layered quilted baby beanie made from ultra soft Cloud-Touch™ fabric. Ensures ultimate head snuggles.',
    sizes: ['One Size'],
    category: 'Knitwear',
    isNew: true,
    rating: 4.9,
    reviewsCount: 17,
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAkJd4UzZc6LQwAJlrNZWfl7-JCSaIXhcbFIqyTdeAIRRx3yCq9mt959TNdSr4v4yj25dwwGDsYjH1ivFR5OIV1JEis3jOmEsu88AVookNjVSWekGKOv5TZ1iSt4dQO3x31w3x_UmAlZnih6ddlWupGxLpFrAG05Q-cYoqDbsjH7qPDk4boP8fYOsR4_WHQsv2cmt-oqNMlovu71KQukfX0dcHKW14iLmLTQle-XtEBKNE9YfhpAIoDZdaVoIoYu1-hfyCguF2Kiyn5'
    ]
  }
];

export const RELATED_PRODUCTS: Product[] = [
  {
    id: 'organic-ribbed-socks',
    name: 'Organic Ribbed Socks',
    price: 4.00,
    originalPrice: 5.00,
    colorName: 'Soft Mint',
    colorHex: '#A0D6B4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTgVh3uhMpJ0JbeTFZJbSU4WWgX_kLm9jfnsK9vAPicesbWi_37GzJ5vuAezgi5-NcyjKjb2LlJHwzLePrESYZNjZalvZVNSFn7QQPOMSbPuQDs5M5qXWe5sslAJabIxHdnOt3vq0ojRX4SSudxqQ0pNAWs30pitQjkhIAncKbb72CCwSsEEwWNUYO3sj4BysvJq6DAtWcJaTLUmn8qzpnH6YmleyX3JT4_ulnP4C_Vki0yZTjFYer9CP6eNY0geXvU2-OgYC-Hbqf',
    description: 'Perfect matching organic ribbed socks with delicate turn-down cuffs. Keeps tiny ankles snug and warm.',
    sizes: ['One Size'],
    category: 'Accessories'
  },
  {
    id: 'cuddle-bunny-linen',
    name: 'Cuddle Bunny Linen',
    price: 7.50,
    originalPrice: 9.00,
    colorName: 'Natural Beige',
    colorHex: '#F5F5DC',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSv0Ek0r5kYfYnsGx0aWOVvqP15Sl0-uV3ibNasfB3CJQGrUgBERd4QIXYo420wxAbhrdsTgoMmeRG1l5LHy7kFmUU6GfyASwtC2ZgDgrTiLug-faJdPnzfIW2tYqniXoI9K30oICcxpsHWSOUC3ngKPF_BxMzeZm4jINcbg1t0aYFmh9trdDk-zVwh3oH9iORaIsEOl5KD6BRVRiHcswQO7dckfmDAP7KJWZSTiOBet0sHh4i919_ohQe7lwEk9W9KsxHlzI18SM5',
    description: 'Ethically made plush toy using sustainable beige linen fibers. Soft and easy for baby to clasp.',
    sizes: ['One Size'],
    category: 'Accessories'
  },
  {
    id: 'organic-bib-set',
    name: 'Organic Bib Set',
    price: 6.00,
    originalPrice: 8.00,
    colorName: 'Pastel Trio',
    colorHex: '#E5D3C5',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5aIOsCtlptr654sr9GLOvGUfH4fqdWGv5iRIbYOx37FEwVvR221YusKt8E2Fj-xfEmALa1Lq5uKDd7GZNylrw2zNBuweI-5WHgAmPxNW5Uy6heyfJ6fKxqwEIkUZ18VEPfUdt6KIH0M_rZaOI3ZxWeD3XMVCB9lctsbyx5zHiZ3QS8TqTNr7n0D9gz0cC8jKEEo5EWXAHlKzpo27k26eBRxi0EpK-aloTKInAUCF32cLZJTPz8-JEezVpkqNGk5XCv1G6JDdeuoUq',
    description: 'Set of three organic bibs in pastel cream, mint, and sand tones. Keeps outfits perfectly clean.',
    sizes: ['One Size'],
    category: 'Accessories'
  },
  {
    id: 'first-steps-moccasins',
    name: 'First Steps Moccasins',
    price: 9.00,
    originalPrice: 11.50,
    colorName: 'Ivory Star',
    colorHex: '#FFFFFF',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMWwKKwXei7htjRL6ip1dsgJcUL2BMtcrvM9LEVaJjHq2EElYrYO79UPHf_ylhmugiTPd6y_DrQYe-CfNQk2nWeIC30iiLwRlVZZFkhGPSlx3yozUC4us2yz6gcY7GchT-7YOnJyo9Ic9SNb14RtpF8b-Iks4n-2H5hV4U9HsgqxH2c11Uw67MpS2VLI7HnK5kwrzmgtZsLjodvJbKnrylTtx2LucyNNlpG11cJjYQpF4Ba8rbyuPx8q6bjvDrryP19NWHBCpBhcnk',
    description: 'Premium white leather moccasins featuring a gorgeous tiny star cut-out. Perfect baby shower gift.',
    sizes: ['One Size'],
    category: 'Accessories'
  }
];

export const ALL_PRODUCTS = [...PRODUCTS, ...RELATED_PRODUCTS];
export const HERO_BANNER_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbgcrmm3gnqAg46ITFYBAxfYk91cWP1xFYTIrHJ1dZDX1CKWPF0-Swa3mz5dKErUDkIhzdnoTAiiT1mxKqoaU2BhFGGIXV1RwoioNq4hiGyIcFHJuBnJmc_VZ-ir3OJgxjTfRi2Ldz_1eqQV1mufI1Jjt8e7D6QREM4-s6IBxMBs_hqehlXdaQSdy6pRizhox6LeDJlAO6REeAaNwxCk7h0ubMmh2IBBzTB11hduBH2CI54NdiJSUCoSWz5vj4YQ2KRKHa7TckXM3h';
