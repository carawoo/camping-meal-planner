export const meals = {
    arrival: [
        {
            id: 'a1',
            title: '떡볶이 밀키트',
            description: '텐트 치고 출출할 때 딱! 라면사리 추가는 필수.',
            image: '/images/tteokbokki_kit.jpg',
            searchQuery: '캠핑 떡볶이 밀키트',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 15,
            priceRange: 'low',
            price: 8000,
            tags: ['spicy', 'quick'],
            rating: 4.5,
            servings: 2,
            allergens: ['gluten', 'soy'],
            dietary: [],
            spicyLevel: 4,
            ingredients: [
                { name: '떡볶이떡', amount: '500g' },
                { name: '어묵', amount: '200g' },
                { name: '대파', amount: '1대' },
                { name: '양파', amount: '1/2개' },
                { name: '라면사리', amount: '1개' }
            ],
            seasonings: [
                { name: '고추장', amount: '3큰술' },
                { name: '고춧가루', amount: '1큰술' },
                { name: '설탕', amount: '2큰술' },
                { name: '간장', amount: '1큰술' }
            ],
            reviews: [
                { author: '매운맛천재', rating: 5, comment: '텐트 치고 출출할 때 최고! 라면사리 꼭 넣으세요', date: '4일 전', emoji: '🌶️' },
                { author: '분식러버', rating: 4, comment: '딱 적당한 매운맛이에요. 아이들도 잘 먹어요', date: '1주 전', emoji: '😋' }
            ]
        },
        {
            id: 'a2',
            title: '간단 파스타',
            description: '원팬으로 끝내는 감성 캠핑 요리.',
            image: '/images/pasta.jpg',
            searchQuery: '캠핑 파스타 밀키트',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 20,
            priceRange: 'medium',
            price: 12000,
            tags: ['romantic', 'one-pan'],
            rating: 4.3,
            servings: 2,
            allergens: ['gluten', 'dairy'],
            dietary: [],
            spicyLevel: 1,
            ingredients: [
                { name: '파스타면', amount: '200g' },
                { name: '토마토소스', amount: '1컵' },
                { name: '양파', amount: '1/2개' },
                { name: '마늘', amount: '3쪽' },
                { name: '올리브유', amount: '2큰술' }
            ],
            seasonings: [
                { name: '소금', amount: '약간' },
                { name: '후추', amount: '약간' },
                { name: '파슬리', amount: '약간' }
            ],
            reviews: [
                { author: '파스타러버', rating: 5, comment: '원팬으로 뚝딱! 설거지도 편하고 맛도 최고예요.', date: '5일 전', emoji: '🍝' },
                { author: '감성캠퍼', rating: 4, comment: '로맨틱한 캠핑 저녁 완성! 와인 한 잔하면 분위기 끝', date: '2주 전', emoji: '🍷' }
            ]
        },
        {
            id: 'a3',
            title: '샌드위치 & 샐러드',
            description: '가볍게 시작하고 싶다면 신선한 샐러드.',
            image: '/images/sandwich.jpg',
            searchQuery: '샌드위치 밀키트',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 5,
            priceRange: 'low',
            price: 9000,
            tags: ['healthy', 'no-cook'],
            rating: 4.2,
            servings: 2,
            allergens: ['gluten', 'dairy'],
            dietary: [],
            spicyLevel: 0,
            ingredients: [
                { name: '식빵', amount: '4조각' },
                { name: '양상추', amount: '4장' },
                { name: '토마토', amount: '1개' },
                { name: '치즈', amount: '2장' },
                { name: '햄/다닥고기', amount: '4장' }
            ],
            seasonings: [
                { name: '마요네즈', amount: '적당량' },
                { name: '머스타드', amount: '적당량' }
            ],
            reviews: [
                { author: '간편식러버', rating: 4, comment: '불 필요없어 캠핑 도착하자마자 바로 먹기 좋아요', date: '2일 전', emoji: '🥪' },
                { author: '헬스힘러', rating: 4, comment: '가볍게 먹기 딱! 준비 간편함', date: '5일 전', emoji: '🥗' }
            ]
        },
        {
            id: 'a4',
            title: '김밥 세트',
            description: '한국인의 소울푸드! 간편하고 든든한 김밥.',
            image: '/images/kimbap.jpg',
            searchQuery: '캠핑 김밥',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 10,
            priceRange: 'low',
            price: 7000,
            tags: ['traditional', 'portable'],
            rating: 4.6,
            servings: 2,
            allergens: ['eggs', 'soy'],
            dietary: [],
            spicyLevel: 0,
            ingredients: [
                { name: '밥', amount: '2공기' },
                { name: '김', amount: '10장' },
                { name: '당근', amount: '1개' },
                { name: '시금치', amount: '100g' },
                { name: '단무지', amount: '3줄' },
                { name: '계란', amount: '2개' }
            ],
            seasonings: [
                { name: '소금', amount: '약간' },
                { name: '참기름', amount: '2큰술' },
                { name: '깨소금', amount: '1작은술' }
            ],
            reviews: [
                { author: '김밥매니아', rating: 5, comment: '미리 만들어가면 캠핑장에서 바로 먹기 좋아요. 포타블 음식 최고', date: '1일 전', emoji: '🍣' },
                { author: '한국인', rating: 5, comment: '상하기 쉽고 든든함. 아침에 먹기 딱이에요', date: '3일 전', emoji: '🍚' }
            ]
        },
        {
            id: 'a5',
            title: '컵라면',
            description: '초간단! 뜨거운 물만 있으면 OK.',
            image: '/images/cup_ramen.jpg',
            searchQuery: '컵라면',
            category: 'simple',
            difficulty: 'easy',
            cookingTime: 3,
            priceRange: 'low',
            price: 3000,
            tags: ['instant', 'quick'],
            rating: 4.0,
            servings: 1,
            allergens: ['gluten', 'soy'],
            dietary: [],
            spicyLevel: 3
        },
        {
            id: 'breakfast-onigiri',
            title: '주먹밥',
            description: '손쉽게 만들어 간편하게 즐기는 한 끼. 다양한 속재료로 변화를 줄 수 있어요.',
            category: 'breakfast',
            image: '/images/onigiri.png',
            cookingTime: 15,
            difficulty: '쉬움',
            servings: 2,
            price: 8000,
            spicyLevel: 0,
            allergens: [],
            dietary: [],
            searchQuery: '주먹밥 김 참치',
            isHidden: false,
            ingredients: [
                { name: '밥', amount: '2공기' },
                { name: '참치캔', amount: '1캔' },
                { name: '김', amount: '4장' },
                { name: '깨', amount: '1큰술' }
            ],
            seasonings: [
                { name: '소금', amount: '약간' },
                { name: '참기름', amount: '1작은술' }
            ],
            reviews: [
                {
                    author: '캠핑마스터',
                    rating: 5,
                    comment: '아침에 빨리 만들기 좋아요! 아이들도 정말 좋아합니다.',
                    date: '7일 전',
                    emoji: '👨‍🍳'
                },
                {
                    author: '우진토르',
                    rating: 4,
                    comment: '간단하지만 든든합니다. 다음엔 다른 속재료도 넣어봐야겠어요.',
                    date: '1주 전',
                    emoji: '🏕️'
                }
            ]
        },
        {
            id: 'a6',
            title: '치킨 샐러드 랩',
            description: '신선한 야채와 닭가슴살로 건강하게.',
            image: '/images/chicken_wrap.jpg',
            searchQuery: '치킨 랩',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 10,
            priceRange: 'medium',
            price: 11000,
            tags: ['healthy', 'protein'],
            rating: 4.4,
            servings: 2,
            allergens: ['gluten', 'dairy'],
            dietary: [],
            spicyLevel: 1,
            ingredients: [
                { name: '닭가슴살', amount: '200g' },
                { name: '토르티야', amount: '2장' },
                { name: '양상추', amount: '4장' },
                { name: '토마토', amount: '1개' },
                { name: '체다치즈', amount: '50g' }
            ],
            seasonings: [
                { name: '랜치소스', amount: '적당량' },
                { name: '소금', amount: '약간' },
                { name: '후추', amount: '약간' }
            ],
            reviews: [
                { author: '헬스트레이너', rating: 5, comment: '닭가슴살 구워서 가면 말기만 하면 돼요. 가벼고 건강해요', date: '2일 전', emoji: '🥗' },
                { author: '다이어터', rating: 4, comment: '야채 많아서 가볍게 먹기 좋음. 캠핑에서 편하게 준비', date: '4일 전', emoji: '🥜' }
            ]
        },
        {
            id: 'a7',
            title: '냉면',
            description: '더운 여름날 시원하게! 얼음 동동~',
            image: '/images/naengmyeon.jpg',
            searchQuery: '캠핑 냉면',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 10,
            priceRange: 'medium',
            price: 13000,
            tags: ['cold', 'summer', 'refreshing'],
            rating: 4.7,
            servings: 2,
            allergens: ['gluten', 'soy'],
            dietary: [],
            spicyLevel: 2,
            ingredients: [
                { name: '냉면면', amount: '2당' },
                { name: '오이', amount: '1개' },
                { name: '계란', amount: '2개' },
                { name: '배', amount: '1/2개' }
            ],
            seasonings: [
                { name: '냉면육수', amount: '2봉' },
                { name: '식초', amount: '1큰술' },
                { name: '겨자', amount: '1큰술' },
                { name: '설탕', amount: '1작은술' }
            ],
            reviews: [
                { author: '여름캠퍼', rating: 5, comment: '여름 캠핑 필수! 얼음 가져가면 정말 시원해요', date: '1일 전', emoji: '🍜' },
                { author: '국수러버', rating: 5, comment: '간편하게 면 삶아서 말기만 하면 돼요. 초간단', date: '3일 전', emoji: '🧂' }
            ]
        },
        {
            id: 'a8',
            title: '유부초밥',
            description: '달콤한 유부에 밥이 쏙! 간편한 일식.',
            image: '/images/yubu_sushi.jpg',
            searchQuery: '유부초밥',
            category: 'japanese',
            difficulty: 'easy',
            cookingTime: 5,
            priceRange: 'low',
            price: 8000,
            tags: ['sweet', 'portable'],
            rating: 4.3,
            servings: 2,
            allergens: ['soy'],
            dietary: ['vegetarian'],
            spicyLevel: 0,
            ingredients: [
                { name: '밥', amount: '1공기' },
                { name: '유부', amount: '10장' },
                { name: '깨', amount: '1작은술' }
            ],
            seasonings: [
                { name: '식초', amount: '2큰술' },
                { name: '설탕', amount: '1큰술' },
                { name: '소금', amount: '약간' }
            ],
            reviews: [
                { author: '일식매니아', rating: 4, comment: '유부에 밥만 넣으면 드라댁! 캠핑에서 간편해요', date: '2일 전', emoji: '🍣' },
                { author: '채식주의자', rating: 4, comment: '고기 없이도 맛있고 가볍게. 준비 쉽운 메뉴', date: '5일 전', emoji: '🌱' }
            ]
        },
        {
            id: 'a9',
            title: '과일 & 요거트',
            description: '상큼하고 건강한 스타트! 비타민 충전.',
            image: '/images/fruit_yogurt.jpg',
            searchQuery: '과일 요거트',
            category: 'simple',
            difficulty: 'easy',
            cookingTime: 2,
            priceRange: 'low',
            price: 6000,
            tags: ['healthy', 'no-cook', 'fresh'],
            rating: 4.5,
            servings: 2,
            allergens: ['dairy'],
            dietary: ['vegetarian'],
            spicyLevel: 0,
            ingredients: [
                { name: '요거트', amount: '2개' },
                { name: '딸기', amount: '1팩' },
                { name: '블루베리', amount: '1컵' },
                { name: '그랄놀라', amount: '50g' }
            ],
            seasonings: [
                { name: '꿀', amount: '1큰술' }
            ],
            reviews: [
                { author: '헬스러버', rating: 5, comment: '조리 필요없어 캠핑 아침 식사로 완벽! 상큼하고 가볍워요', date: '1일 전', emoji: '🍓' },
                { author: '비타민충전', rating: 5, comment: '과일만 미리 깨끗이 씀어가면 최고. 깨끗함을 지킬 수 있어요', date: '2일 전', emoji: '🥤' }
            ]
        },
        {
            id: 'a10',
            title: '핫도그 & 감자튀김',
            description: '아이들이 좋아하는 클래식 메뉴!',
            image: '/images/hotdog.jpg',
            searchQuery: '핫도그 감자튀김',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 15,
            priceRange: 'low',
            price: 9000,
            tags: ['kids-favorite', 'classic'],
            rating: 4.4,
            servings: 3,
            allergens: ['gluten'],
            dietary: [],
            spicyLevel: 0,
            ingredients: [
                { name: '핫도그빵', amount: '3개' },
                { name: '소시지', amount: '3개' },
                { name: '감자', amount: '3개' },
                { name: '양파', amount: '1/2개' }
            ],
            seasonings: [
                { name: '케차', amount: '적당량' },
                { name: '머스타드', amount: '적당량' },
                { name: '소금', amount: '약간' }
            ],
            reviews: [
                { author: '키즈카페', rating: 5, comment: '아이들이 만들기부터 좋아해요. 캠핑에서 간단하게!', date: '1일 전', emoji: '🌭' },
                { author: '애기아빠', rating: 4, comment: '감자튀김도 편하게 튀겨지고 아이들 다 잘 먹어요', date: '3일 전', emoji: '🥔' }
            ]
        },
        {
            id: 'a11',
            title: '캠핑 카레',
            description: '간편하게 즐기는 따뜻한 카레! 밥이랑 같이.',
            image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=80',
            searchQuery: '캠핑 카레 밀키트',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 20,
            priceRange: 'low',
            price: 10000,
            tags: ['comfort', 'warm', 'quick'],
            rating: 4.5,
            servings: 3,
            allergens: ['gluten', 'dairy'],
            dietary: [],
            spicyLevel: 2,
            ingredients: [
                { name: '카레루', amount: '1박스' },
                { name: '감자', amount: '2개' },
                { name: '당근', amount: '1개' },
                { name: '양파', amount: '1개' }
            ],
            seasonings: [
                { name: '물', amount: '700ml' }
            ],
            reviews: [
                { author: '카레클럽', rating: 5, comment: '한 냄비로 한 번에! 밥만 있으면 바로 먹을 수 있어요', date: '2일 전', emoji: '🍛' },
                { author: '간편요리', rating: 5, comment: '캠핑 어린이 메뉴 1순위. 성인도 맛있게', date: '4일 전', emoji: '👶' }
            ]
        },
        {
            id: 'a12',
            title: '바게트 샌드위치',
            description: '바삭한 빵에 치즈와 햄을 듬뿍!',
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
            searchQuery: '바게트 샌드위치',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 5,
            priceRange: 'low',
            price: 8000,
            tags: ['bread', 'simple', 'portable'],
            rating: 4.3,
            servings: 2,
            allergens: ['gluten', 'dairy'],
            dietary: [],
            spicyLevel: 0
        },
        {
            id: 'a13',
            title: '떡볶이',
            description: '분식의 정석! 매콤달콤 떡볶이.',
            image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop&q=80',
            searchQuery: '떡볶이',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 15,
            priceRange: 'low',
            price: 8000,
            tags: ['korean-snack', 'spicy'],
            rating: 4.8,
            servings: 2,
            allergens: ['gluten', 'soy'],
            dietary: [],
            spicyLevel: 4
        },
        {
            id: 'a13_side',
            title: '모둠 튀김',
            description: '떡볶이 국물에 찍어먹는 바삭한 튀김.',
            image: '/images/tempura.png',
            searchQuery: '모둠 튀김',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 10,
            priceRange: 'low',
            price: 6000,
            tags: ['side', 'crispy'],
            rating: 4.5,
            servings: 2,
            allergens: ['gluten'],
            dietary: [],
            spicyLevel: 0,
            isHidden: false
        },
        {
            id: 'a14',
            title: '치킨',
            description: '캠핑의 로망! 바삭한 치킨.',
            image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80',
            searchQuery: '치킨',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 30,
            priceRange: 'medium',
            price: 15000,
            tags: ['popular', 'party'],
            rating: 4.9,
            servings: 3,
            allergens: ['gluten'],
            dietary: [],
            spicyLevel: 1
        },
        {
            id: 'a14_side',
            title: '맥주',
            description: '치킨엔 역시 시원한 맥주!',
            image: '/images/beer.png',
            searchQuery: '맥주',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 0,
            priceRange: 'low',
            price: 4000,
            tags: ['drink', 'alcohol'],
            rating: 4.8,
            servings: 2,
            allergens: ['gluten'],
            dietary: [],
            spicyLevel: 0,
            isHidden: false
        },
        {
            id: 'a15',
            title: '라면',
            description: '캠핑 필수템! 보글보글 라면.',
            image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&auto=format&fit=crop&q=80',
            searchQuery: '라면',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 10,
            priceRange: 'low',
            price: 5000,
            tags: ['classic', 'soup'],
            rating: 4.6,
            servings: 2,
            allergens: ['gluten', 'soy', 'eggs'],
            dietary: [],
            spicyLevel: 3,
            ingredients: [
                { name: '라면', amount: '2개' },
                { name: '계란', amount: '2개' },
                { name: '대파', amount: '1/2대' },
                { name: '물', amount: '550ml x 2' }
            ],
            seasonings: [
                { name: '라면스프', amount: '제공' },
                { name: '참기름', amount: '약간(선택)' }
            ],
            reviews: [
                { author: '라면왕', rating: 5, comment: '캠핑엔 역시 라면이죠! 계란 넣으면 완벽', date: '2일 전', emoji: '🍜' },
                { author: '야외요리사', rating: 4, comment: '새벽 공기 마시면서 먹는 라면 한 그릇... 천국', date: '5일 전', emoji: '🏕️' }
            ]
        },
        {
            id: 'a15_side',
            title: '김밥',
            description: '라면과 함께 먹는 든든한 김밥.',
            image: '/images/kimbap.jpg',
            searchQuery: '김밥',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 0,
            priceRange: 'low',
            price: 4000,
            tags: ['side', 'rice'],
            rating: 4.5,
            servings: 2,
            allergens: ['soy', 'eggs'],
            dietary: [],
            spicyLevel: 0,
            isHidden: true
        }
    ],
    dinner: [
        {
            id: 'd1',
            title: '돈마호크 스테이크',
            description: '캠핑의 꽃은 역시 고기! 비주얼 끝판왕.',
            image: '/images/tomahawk.jpg',
            searchQuery: '돈마호크 스테이크',
            category: 'western',
            difficulty: 'medium',
            cookingTime: 30,
            priceRange: 'high',
            price: 35000,
            tags: ['premium', 'bbq', 'impressive'],
            rating: 4.9,
            servings: 3,
            allergens: [],
            dietary: [],
            spicyLevel: 0,
            ingredients: [
                { name: '돈마호크 스테이크', amount: '1kg' },
                { name: '로즈마리', amount: '3줄기' },
                { name: '마늘', amount: '5쪽' },
                { name: '버터', amount: '50g' }
            ],
            seasonings: [
                { name: '소금(굵은소금)', amount: '적당량' },
                { name: '통후추', amount: '적당량' },
                { name: '올리브오일', amount: '2큰술' }
            ],
            reviews: [
                { author: '스테이크마스터', rating: 5, comment: '비주얼만으로 승리! 인생 캠핑 요리입니다', date: '6일 전', emoji: '🥩' },
                { author: '고급캠퍼', rating: 5, comment: '중불에서 천천히 구우면 육즙 폭발! 와인 필수', date: '2주 전', emoji: '👨‍🍳' }
            ]
        },
        {
            id: 'd2',
            title: '감바스 알 아히요',
            description: '와인 한 잔과 함께하는 분위기 있는 저녁.',
            image: '/images/gambas.jpg',
            searchQuery: '감바스 밀키트',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 15,
            priceRange: 'medium',
            price: 18000,
            tags: ['romantic', 'wine-pairing', 'seafood'],
            rating: 4.6,
            servings: 2,
            allergens: ['seafood', 'shellfish'],
            dietary: [],
            spicyLevel: 2,
            ingredients: [
                { name: '새우', amount: '300g' },
                { name: '마늘', amount: '10쪽' },
                { name: '올리브오일', amount: '1/2컵' },
                { name: '바게트빵', amount: '1개' }
            ],
            seasonings: [
                { name: '소금', amount: '약간' },
                { name: '후추', amount: '약간' },
                { name: '파슬리', amount: '약간' },
                { name: '레몬즙', amount: '1큰술' }
            ],
            reviews: [
                { author: '와인러버', rating: 5, comment: '화이트 와인과 환상궁합! 바게트에 찍어먹으면 천국', date: '3일 전', emoji: '🍷' },
                { author: '로맨티스트', rating: 5, comment: '분위기 있는 캠핑 저녁 완성. 마늘향 진짜 좋아요', date: '1주 전', emoji: '🦐' }
            ]
        },
        {
            id: 'd3',
            title: '얼큰한 부대찌개',
            description: '쌀쌀한 저녁엔 뜨끈한 국물이 최고.',
            image: '/images/budae_jjigae.jpg',
            searchQuery: '캠핑 부대찌개',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 20,
            priceRange: 'medium',
            price: 15000,
            tags: ['spicy', 'hot', 'comfort'],
            rating: 4.7,
            servings: 3,
            allergens: ['gluten', 'soy'],
            dietary: [],
            spicyLevel: 4,
            ingredients: [
                { name: '햄', amount: '200g' },
                { name: '소시지', amount: '4개' },
                { name: '김치', amount: '1컵' },
                { name: '라면', amount: '2개' },
                { name: '떡', amount: '100g' }
            ],
            seasonings: [
                { name: '고춧가루', amount: '2큰술' },
                { name: '고추장', amount: '2큰술' },
                { name: '간장', amount: '1큰술' },
                { name: '설탕', amount: '1작은술' }
            ],
            reviews: [
                { author: '국물러버', rating: 5, comment: '추운 날 먹으면 몸이 확 녹아요! 라면사리 필수!', date: '2일 전', emoji: '🍲' },
                { author: '매운맛고수', rating: 4, comment: '얼큰하니 술 안주로도 최고. 소주 한잔 ㄱㄱ', date: '1주 전', emoji: '🌶️' }
            ]
        },
        {
            id: 'd4',
            title: '삼겹살 세트',
            description: '한국인의 영혼! 구이의 정석.',
            image: '/images/samgyeopsal.jpg',
            searchQuery: '캠핑 삼겹살',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 25,
            priceRange: 'medium',
            price: 20000,
            tags: ['bbq', 'popular', 'soju-pairing'],
            rating: 4.8,
            servings: 4,
            allergens: [],
            dietary: [],
            spicyLevel: 1,
            ingredients: [
                { name: '삼겹살', amount: '800g' },
                { name: '상추', amount: '1단' },
                { name: '쌈장', amount: '200g' },
                { name: '마늘', amount: '1통' },
                { name: '김치', amount: '300g' }
            ],
            seasonings: [
                { name: '소금', amount: '약간' },
                { name: '참기름', amount: '1큰술' }
            ],
            reviews: [
                { author: '고기왕', rating: 5, comment: '캠핑의 왕도는 역시 삼겹살! 소주가 술술 들어가요 🍺', date: '3일 전', emoji: '🥓' },
                { author: '불멍러버', rating: 5, comment: '불판에 지글지글 구워지는 삼겹살 소리가 ASMR...', date: '1주 전', emoji: '🔥' }
            ]
        },
        {
            id: 'd5',
            title: '바비큐 립',
            description: '손에 들고 뜯는 맛! 달콤 짭짤한 소스.',
            image: '/images/bbq_ribs.jpg',
            searchQuery: '바비큐 립',
            category: 'western',
            difficulty: 'medium',
            cookingTime: 40,
            priceRange: 'high',
            price: 25000,
            tags: ['bbq', 'messy', 'delicious'],
            rating: 4.7,
            servings: 3,
            allergens: ['soy'],
            dietary: [],
            spicyLevel: 1,
            ingredients: [
                { name: '돼지갈비', amount: '1kg' },
                { name: '바비큐소스', amount: '1컵' },
                { name: '양파', amount: '1개' },
                { name: '맥주', amount: '1캔' }
            ],
            seasonings: [
                { name: '간장', amount: '3큰술' },
                { name: '꿀', amount: '2큰술' },
                { name: '마늘가루', amount: '1큰술' },
                { name: '후추', amount: '약간' }
            ],
            reviews: [
                { author: 'BBQ킹', rating: 5, comment: '손이 더러워지는 걸 감수할만한 맛! 맥주 필수', date: '4일 전', emoji: '🍖' },
                { author: '육식러버', rating: 5, comment: '40분 기다릴만한 가치 있음. 애들도 완전 좋아해요', date: '1주 전', emoji: '😋' }
            ]
        },
        {
            id: 'd6',
            title: '해물찜',
            description: '싱싱한 해산물의 향연! 매콤하게.',
            image: '/images/seafood_jjim.jpg',
            searchQuery: '해물찜',
            category: 'korean',
            difficulty: 'medium',
            cookingTime: 35,
            priceRange: 'high',
            price: 30000,
            tags: ['seafood', 'spicy', 'premium'],
            rating: 4.6,
            servings: 4,
            allergens: ['seafood', 'shellfish'],
            dietary: [],
            spicyLevel: 4
        },
        {
            id: 'd7',
            title: '김치찌개',
            description: '한국인의 소울푸드! 구수하고 얼큰하게.',
            image: '/images/kimchi_jjigae.jpg',
            searchQuery: '캠핑 김치찌개',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 20,
            priceRange: 'low',
            price: 12000,
            tags: ['traditional', 'spicy', 'comfort'],
            rating: 4.5,
            servings: 3,
            allergens: ['soy'],
            dietary: [],
            spicyLevel: 3,
            ingredients: [
                { name: '김치', amount: '2컵' },
                { name: '돼지고기', amount: '200g' },
                { name: '두부', amount: '1/2모' },
                { name: '대파', amount: '1대' },
                { name: '물', amount: '3컵' }
            ],
            seasonings: [
                { name: '고춧가루', amount: '1큰술' },
                { name: '된장', amount: '1작은술' },
                { name: '다진마늘', amount: '1큰술' }
            ],
            reviews: [
                { author: '캠핑요리왕', rating: 5, comment: '한 냄비로 뚝딱! 밥 말아먹으면 완벽해요. 캠핑 필수 메뉴', date: '3일 전', emoji: '🍲' },
                { author: '구수한맛', rating: 5, comment: '재료 간단해서 캠핑에서 만들기 정말 쉬워요', date: '1주 전', emoji: '🏕️' }
            ]
        },
        {
            id: 'd8',
            title: '불고기',
            description: '달콤한 양념에 재운 소고기, 밥도둑!',
            image: '/images/bulgogi.jpg',
            searchQuery: '불고기 밀키트',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 20,
            priceRange: 'medium',
            price: 18000,
            tags: ['sweet', 'traditional', 'popular'],
            rating: 4.7,
            servings: 3,
            allergens: ['soy'],
            dietary: [],
            spicyLevel: 1,
            ingredients: [
                { name: '소고기(불고기용)', amount: '500g' },
                { name: '양파', amount: '1개' },
                { name: '당근', amount: '1/2개' },
                { name: '대파', amount: '1대' },
                { name: '깨', amount: '1큰술' }
            ],
            seasonings: [
                { name: '간장', amount: '4큰술' },
                { name: '설탕', amount: '2큰술' },
                { name: '다진마늘', amount: '1큰술' },
                { name: '참기름', amount: '1큰술' },
                { name: '후추', amount: '약간' }
            ],
            reviews: [
                { author: '불고기매니아', rating: 5, comment: '미리 재워가면 캠핑장에서 바로 구워먹기 딱! 애들이 진짜 좋아해요', date: '2일 전', emoji: '🥩' },
                { author: '달콤이', rating: 5, comment: '캠핑 불판에 구우니 더 맛있어요. 간단하게 준비 가능', date: '5일 전', emoji: '👨‍🍳' }
            ]
        },
        {
            id: 'd9',
            title: '파에야',
            description: '스페인 감성 가득! 해산물 사프란 라이스.',
            image: '/images/paella.jpg',
            searchQuery: '파에야 밀키트',
            category: 'western',
            difficulty: 'medium',
            cookingTime: 35,
            priceRange: 'high',
            price: 28000,
            tags: ['exotic', 'seafood', 'impressive'],
            rating: 4.5,
            servings: 4,
            allergens: ['seafood', 'shellfish'],
            dietary: [],
            spicyLevel: 1,
            ingredients: [
                { name: '쌀', amount: '2컵' },
                { name: '새우', amount: '12마리' },
                { name: '홍합', amount: '10개' },
                { name: '오징어', amount: '1마리' },
                { name: '파프리카', amount: '1개' }
            ],
            seasonings: [
                { name: '사프란', amount: '약간' },
                { name: '마늘', amount: '5쪽' },
                { name: '올리브오일', amount: '3큰술' },
                { name: '소금', amount: '약간' }
            ],
            reviews: [
                { author: '스페인요리사', rating: 5, comment: '파에야 팬 하나면 캠핑에서도 가능! 분위기 정말 좋아요', date: '5일 전', emoji: '🥘' },
                { author: '해산물덕후', rating: 4, comment: '35분 소요되지만 그만한 가치 있음. 인생샷 건질 수 있어요', date: '1주 전', emoji: '📸' }
            ]
        },
        {
            id: 'd10',
            title: '훈제 오리',
            description: '프리미엄 캠핑! 부드러운 훈제향.',
            image: '/images/smoked_duck.jpg',
            searchQuery: '훈제 오리',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 10,
            priceRange: 'high',
            price: 32000,
            tags: ['premium', 'no-cook', 'wine-pairing'],
            rating: 4.6,
            servings: 2,
            allergens: [],
            dietary: [],
            spicyLevel: 0,
            ingredients: [
                { name: '훈제오리', amount: '300g' },
                { name: '상추', amount: '1단' },
                { name: '쌈장', amount: '적당량' },
                { name: '마늘', amount: '5쪽' }
            ],
            seasonings: [
                { name: '소금', amount: '약간' },
                { name: '후추', amount: '약간' }
            ],
            reviews: [
                { author: '프리미엄캠퍼', rating: 5, comment: '조리 필요없이 바로 먹을 수 있어서 캠핑에 최고! 와인이랑 완벽', date: '4일 전', emoji: '🦆' },
                { author: '훈제러버', rating: 5, comment: '불 피우기 귀찮을 때 딱이에요. 상추 쌈 싸먹으면 꿀맛', date: '1주 전', emoji: '🍷' }
            ]
        },
        {
            id: 'd11',
            title: '일본식 카레',
            description: '국물이 진한 일본 카레! 당근, 감자 듬뿍.',
            image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80',
            searchQuery: '일본 카레 밀키트',
            category: 'japanese',
            difficulty: 'easy',
            cookingTime: 25,
            priceRange: 'medium',
            price: 15000,
            tags: ['comfort', 'rich', 'filling'],
            rating: 4.7,
            servings: 3,
            allergens: ['gluten'],
            dietary: [],
            spicyLevel: 2,
            ingredients: [
                { name: '카레루', amount: '1박스' },
                { name: '감자', amount: '2개' },
                { name: '당근', amount: '1개' },
                { name: '양파', amount: '1개' },
                { name: '소고기/돼지고기', amount: '300g' }
            ],
            seasonings: [
                { name: '물', amount: '700ml' },
                { name: '소금', amount: '약간' }
            ],
            reviews: [
                { author: '카레덕후', rating: 5, comment: '캠핑 카레는 한 냄비로 끝! 밥 위에 부어먹으면 든든해요', date: '3일 전', emoji: '🍛' },
                { author: '일식러버', rating: 5, comment: '재료 썰어서 넣기만 하면 되니 너무 간편. 아이들 최애 메뉴', date: '6일 전', emoji: '👶' }
            ]
        },
        {
            id: 'd12',
            title: '삼겹살',
            description: '캠핑의 클래식! 구운 삼겹살.',
            image: 'https://images.unsplash.com/photo-1600555379765-f82335a7b1b0?w=800&auto=format&fit=crop&q=80',
            searchQuery: '삼겹살',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 25,
            priceRange: 'medium',
            price: 18000,
            tags: ['bbq', 'classic'],
            rating: 4.9,
            servings: 3,
            allergens: [],
            dietary: [],
            spicyLevel: 1
        },
        {
            id: 'd12_side',
            title: '소주',
            description: '삼겹살엔 역시 소주 한잔.',
            image: '/images/soju.png',
            searchQuery: '소주',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 0,
            priceRange: 'low',
            price: 4000,
            tags: ['drink', 'alcohol'],
            rating: 4.8,
            servings: 2,
            allergens: [],
            dietary: [],
            spicyLevel: 0,
            isHidden: false
        },
        {
            id: 'd13',
            title: '피자',
            description: '간편하게! 오븐에 구운 피자.',
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
            searchQuery: '캠핑 피자',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 15,
            priceRange: 'medium',
            price: 14000,
            tags: ['easy', 'kids-favorite'],
            rating: 4.5,
            servings: 2,
            allergens: ['gluten', 'dairy'],
            dietary: [],
            spicyLevel: 0
        },
        {
            id: 'd13_side',
            title: '콜라',
            description: '피자와 함께 시원한 콜라.',
            image: '/images/cola.png',
            searchQuery: '콜라',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 0,
            priceRange: 'low',
            price: 2000,
            tags: ['drink', 'soda'],
            rating: 4.4,
            servings: 2,
            allergens: [],
            dietary: [],
            spicyLevel: 0,
            isHidden: false
        }
    ],
    breakfast: [
        {
            id: 'b1',
            title: '해장 라면',
            description: '전날 과음했다면 필수! 콩나물 풍풍.',
            image: '/images/ramen.jpg',
            searchQuery: '해장 라면',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 10,
            priceRange: 'low',
            price: 8000,
            tags: ['hangover', 'spicy', 'quick'],
            rating: 4.6,
            servings: 2,
            allergens: ['gluten', 'soy', 'eggs'],
            dietary: [],
            spicyLevel: 3,
            ingredients: [
                { name: '라면', amount: '2개' },
                { name: '콩나물', amount: '1컵' },
                { name: '계란', amount: '2개' },
                { name: '대파', amount: '1대' }
            ],
            seasonings: [
                { name: '라면스프', amount: '제공' },
                { name: '다시다', amount: '1작은술' }
            ],
            reviews: [
                { author: '해장타', rating: 5, comment: '술 먹은 다음날 아침 필수! 콩나물 넣으면 완벽', date: '1일 전', emoji: '🍜' },
                { author: '소주러버', rating: 5, comment: '캠핑 두어짐 해장엔 역시 라면! 간단하게 끓여먹기', date: '2일 전', emoji: '🍺' }
            ]
        },
        {
            id: 'b2',
            title: '베이글',
            description: '새소리 들으며 즐기는 여유로운 아침.',
            image: '/images/bagel.jpg',
            searchQuery: '베이글',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 5,
            priceRange: 'low',
            price: 5000,
            tags: ['relaxing', 'simple'],
            rating: 4.4,
            servings: 1,
            allergens: ['gluten'],
            dietary: ['vegetarian'],
            spicyLevel: 0
        },
        {
            id: 'b2_side',
            title: '드립 커피',
            description: '향긋한 모닝 커피.',
            image: '/images/coffee.png',
            searchQuery: '드립 커피',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 5,
            priceRange: 'low',
            price: 4000,
            tags: ['coffee', 'drink'],
            rating: 4.7,
            servings: 1,
            allergens: [],
            dietary: ['vegetarian', 'vegan'],
            spicyLevel: 0,
            isHidden: false
        },
        {
            id: 'b3',
            title: '누룽지 탕',
            description: '속 편하고 든든하게, 구수한 누룽지.',
            image: '/images/nurungji.jpg',
            searchQuery: '누룽지',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 15,
            priceRange: 'low',
            price: 7000,
            tags: ['traditional', 'comfort', 'warm'],
            rating: 4.3,
            servings: 2,
            allergens: [],
            dietary: ['vegetarian', 'vegan'],
            spicyLevel: 0
        },
        {
            id: 'b4',
            title: '계란말이',
            description: '폭신폭신한 계란말이.',
            image: '/images/rolled_omelet.jpg',
            searchQuery: '계란말이',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 10,
            priceRange: 'low',
            price: 6000,
            tags: ['protein', 'classic'],
            rating: 4.5,
            servings: 2,
            allergens: ['eggs'],
            dietary: [],
            spicyLevel: 0
        },
        {
            id: 'b4_side',
            title: '소시지',
            description: '뽀득뽀득 맛있는 소시지.',
            image: '/images/sausage.png',
            searchQuery: '소시지',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 5,
            priceRange: 'low',
            price: 4000,
            tags: ['meat', 'kids-favorite'],
            rating: 4.4,
            servings: 2,
            allergens: ['soy'],
            dietary: [],
            spicyLevel: 0,
            isHidden: false
        },
        {
            id: 'b5',
            title: '토스트',
            description: '바삭하게 구운 토스트.',
            image: '/images/toast.jpg',
            searchQuery: '토스트',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 5,
            priceRange: 'low',
            price: 4000,
            tags: ['simple', 'classic'],
            rating: 4.2,
            servings: 1,
            allergens: ['gluten'],
            dietary: ['vegetarian'],
            spicyLevel: 0
        },
        {
            id: 'b5_side',
            title: '딸기 잼',
            description: '달콤한 딸기 잼.',
            image: '/images/jam.png',
            searchQuery: '딸기 잼',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 0,
            priceRange: 'low',
            price: 2000,
            tags: ['sweet', 'topping'],
            rating: 4.3,
            servings: 2,
            allergens: [],
            dietary: ['vegetarian', 'vegan'],
            spicyLevel: 0,
            isHidden: false
        },
        {
            id: 'b6',
            title: '된장찌개',
            description: '구수한 된장국물로 속 풀기.',
            image: '/images/budae_jjigae.jpg',
            searchQuery: '된장찌개',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 20,
            priceRange: 'low',
            price: 11000,
            tags: ['traditional', 'comfort', 'warm'],
            rating: 4.4,
            servings: 3,
            allergens: ['soy'],
            dietary: [],
            spicyLevel: 1
        },
        {
            id: 'b7',
            title: '오트밀',
            description: '건강한 아침! 식이섬유 가득.',
            image: '/images/oatmeal.jpg',
            searchQuery: '오트밀',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 5,
            priceRange: 'low',
            price: 5000,
            tags: ['healthy', 'fiber'],
            rating: 4.1,
            servings: 1,
            allergens: ['gluten'],
            dietary: ['vegetarian', 'vegan'],
            spicyLevel: 0
        },
        {
            id: 'b7_side',
            title: '제철 과일',
            description: '상큼한 제철 과일 토핑.',
            image: '/images/fruit.png',
            searchQuery: '과일',
            category: 'simple',
            difficulty: 'easy',
            cookingTime: 0,
            priceRange: 'low',
            price: 3000,
            tags: ['fresh', 'vitamin'],
            rating: 4.5,
            servings: 1,
            allergens: [],
            dietary: ['vegetarian', 'vegan'],
            spicyLevel: 0,
            isHidden: true
        },
        {
            id: 'b8',
            title: '팬케이크',
            description: '폭신폭신 달콤한 아침! 메이플 시럽 듬뿍.',
            image: '/images/toast.jpg',
            searchQuery: '팬케이크',
            category: 'western',
            difficulty: 'medium',
            cookingTime: 20,
            priceRange: 'medium',
            price: 12000,
            tags: ['sweet', 'fluffy', 'kids-favorite'],
            rating: 4.7,
            servings: 3,
            allergens: ['gluten', 'eggs', 'dairy'],
            dietary: ['vegetarian'],
            spicyLevel: 0
        },
        {
            id: 'b9',
            title: '김치볶음밥',
            description: '남은 김치로 뚝딱! 계란 프라이 올려서.',
            image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop&q=80',
            searchQuery: '김치볶음밥',
            category: 'korean',
            difficulty: 'easy',
            cookingTime: 15,
            priceRange: 'low',
            price: 9000,
            tags: ['spicy', 'fried-rice', 'quick'],
            rating: 4.6,
            servings: 2,
            allergens: ['eggs', 'soy'],
            dietary: [],
            spicyLevel: 3
        },
        {
            id: 'b10',
            title: '스크램블 에그',
            description: '부드럽고 크리미한 스크램블! 토스트와 함께.',
            image: '/images/egg_sausage.jpg',
            searchQuery: '스크램블 에그',
            category: 'western',
            difficulty: 'easy',
            cookingTime: 10,
            priceRange: 'low',
            price: 8000,
            tags: ['protein', 'creamy', 'classic'],
            rating: 4.3,
            servings: 2,
            allergens: ['eggs', 'dairy'],
            dietary: ['vegetarian'],
            spicyLevel: 0
        }
    ]
};

// 카테고리 정의
export const categories = {
    all: '전체',
    korean: '한식',
    western: '양식',
    japanese: '일식',
    simple: '간편식'
};

// 난이도 정의
export const difficulties = {
    all: '전체',
    easy: '쉬움',
    medium: '보통',
    hard: '어려움'
};

// 가격대 정의
export const priceRanges = {
    all: '전체',
    low: '1만원 이하',
    medium: '1-3만원',
    high: '3만원 이상'
};

// 알레르기 정의
export const allergens = {
    seafood: '해산물',
    shellfish: '갑각류',
    nuts: '견과류',
    dairy: '유제품',
    gluten: '글루텐',
    soy: '대두',
    eggs: '계란'
};

// 식이 제한 정의
export const dietaryOptions = {
    vegetarian: '채식',
    vegan: '비건',
    halal: '할랄'
};
