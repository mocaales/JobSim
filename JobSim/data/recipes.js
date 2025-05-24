const recipes = [
    {
        id: 1,
        title: 'Chicken Curry',
        description: 'Aromatic and spicy Indian chicken curry.',
        recipe: `Chicken Curry is a quintessential Indian dish, bursting with rich, aromatic spices and tender pieces of chicken that are infused with deep flavor. To begin, marinate chunks of chicken in a mixture of thick, creamy yogurt, a vibrant blend of turmeric, chili powder, and a dash of salt. Let the marinade infuse the meat for at least 30 minutes, allowing the spices to penetrate deeply. In a large, heavy-bottomed pot, heat a generous amount of oil and sauté finely chopped onions until they soften and caramelize into a golden hue, releasing their natural sweetness.
                Add minced garlic and freshly grated ginger, cooking until fragrant and melding with the onions. Whole spices such as cumin seeds and cardamom pods are then added, providing warm and earthy undertones. Sprinkle in ground coriander, garam masala, and a hint of cayenne pepper for an added kick. The marinated chicken is introduced to the pot, searing until each piece is browned and sealed with a flavorful crust. Pour in a rich tomato puree, stirring thoroughly to incorporate the spices and create a thick, luxurious sauce. Simmer the mixture, adding water or stock to achieve the perfect consistency, and cover the pot to allow the chicken to cook through until it is tender and succulent.      The final touch comes with a scattering of freshly chopped cilantro, adding a burst of green and a refreshing aroma. Chicken Curry is best served with steaming basmati rice or fluffy naan bread, offering a perfect balance of flavors and textures that make it a perennial favorite in Indian cuisine.`,
        steps: [
          "Marinate chicken in yogurt, turmeric, chili powder, and salt",
          "Finely chop onions, garlic, and ginger",
          "Heat oil and sauté onions until golden",
          "Add garlic and ginger, cook until fragrant",
          "Add cumin seeds and cardamom pods",
          "Stir in ground coriander, garam masala, cayenne",
          "Add marinated chicken and brown",
          "Pour in tomato puree and simmer",
          "Add water/stock, cover and cook until tender",
          "Garnish with cilantro and serve"
        ]
      },
  {
    id: 2,
    title: 'Seafood Paella',
    description: 'Classic Spanish rice dish with seafood.',
    recipe: `Seafood Paella is a stunning Spanish classic that marries the rich flavors of the ocean with vibrant spices and vegetables. Begin by heating a generous amount of high-quality olive oil in a large, flat paella pan over medium heat. Sauté finely chopped onions, minced garlic, and colorful bell peppers until they soften and release their sweet aroma. Add grated ripe tomatoes and a touch of smoky paprika, stirring well to infuse the mixture with a deep, earthy flavor. Stir in the short-grain rice, allowing it to toast lightly and absorb the flavorful base.
            Pour in a fragrant fish stock that has been infused with a generous pinch of saffron threads, creating a rich, golden hue. Gently stir to distribute the rice evenly, and bring the mixture to a gentle simmer. Carefully arrange a selection of fresh seafood, such as succulent prawns, plump mussels, and tender squid rings, evenly over the surface of the rice. Lower the heat and cook uncovered, allowing the rice to absorb the liquid and develop the prized crispy bottom layer known as socarrat.
            As the rice nears perfection, scatter bright green peas and strips of roasted red peppers across the surface, adding a pop of color and freshness. Once cooked, cover the pan and let the paella rest for a few minutes, allowing the flavors to meld beautifully. Just before serving, garnish the paella with lemon wedges for a burst of citrusy brightness, and serve family-style to capture the communal spirit of this beloved dish.`,
    steps: [
      "Heat olive oil in a paella pan",
      "Sauté onions, garlic, and bell peppers",
      "Add grated tomatoes and smoked paprika",
      "Stir in rice and toast lightly",
      "Pour in saffron-infused fish stock",
      "Arrange seafood evenly over the rice",
      "Cook uncovered until rice absorbs liquid",
      "Scatter peas and roasted peppers on top",
      "Cover and rest before serving with lemon"
    ]
  },
  {
    id: 3,
    title: 'Beef Wellington',
    description: 'Elegant beef dish wrapped in puff pastry.',
    recipe: `Beef Wellington is an exquisite and luxurious dish that combines the succulence of beef tenderloin with the richness of mushroom duxelles and the delicate flakiness of puff pastry. Begin by generously seasoning the beef tenderloin with salt and freshly ground black pepper, then sear it in a hot, oiled pan until it is browned evenly on all sides, locking in the juices and flavor. Remove the beef from the pan and set aside to cool. In the same pan, prepare the mushroom duxelles by finely chopping a mixture of cremini and shiitake mushrooms, then sauté them with shallots, garlic, and fresh thyme until all moisture has evaporated and the mixture is deeply aromatic and flavorful.
            Next, lay out thin slices of prosciutto on a sheet of cling film, slightly overlapping to form a seamless layer. Spread the cooled duxelles evenly over the prosciutto, creating a flavorful blanket. Place the seared beef tenderloin on top, and carefully roll it in the prosciutto and duxelles, using the cling film to wrap it tightly. Chill the wrapped beef to allow the layers to set. Roll out the puff pastry and place the wrapped beef on it, then encase the entire roll, sealing the edges and trimming excess pastry. Chill again to firm up before baking. Brush the surface with a rich egg wash for a golden, glossy finish. Bake in a preheated oven until the pastry is crisp and golden and the beef reaches a perfect medium rare.
            Let the Beef Wellington rest for a few minutes before slicing to retain its juices. Serve with a decadent red wine reduction or a rich demi-glace, accompanied by roasted vegetables or creamy mashed potatoes for a truly memorable meal.`,
    steps: [
      "Season beef with salt and pepper, sear until browned",
      "Cool beef and prepare mushroom duxelles",
      "Cook mushrooms with shallots, garlic, and thyme",
      "Spread duxelles over prosciutto slices",
      "Wrap beef in prosciutto and duxelles",
      "Encase in puff pastry, chill",
      "Brush with egg wash",
      "Bake until pastry is golden and beef medium rare",
      "Rest and slice",
      "Serve with red wine reduction"
    ]
  },
  {
    id: 4,
    title: 'Lamb Rogan Josh',
    description: 'Rich Kashmiri lamb curry with spices.',
    recipe: `Lamb Rogan Josh is a classic Kashmiri dish, renowned for its deep red hue and rich, aromatic flavors. Begin by marinating chunks of lamb in a mixture of creamy yogurt, ground turmeric, chili powder, and a pinch of salt, allowing the flavors to penetrate the meat for at least an hour. In a heavy-bottomed pan, melt fragrant ghee and add whole spices such as cinnamon sticks, cloves, and green cardamom pods, letting them release their aromas. Add finely sliced onions and cook until golden and caramelized, then stir in a paste made from freshly crushed garlic and ginger. As the mixture sizzles, sprinkle in ground fennel, cumin, and coriander to infuse the base with warm, earthy tones. Introduce the marinated lamb to the pan, searing the pieces until browned and coated with spices. Pour in a combination of tomato paste and water to create a rich sauce, then cover and simmer on low heat for at least an hour, allowing the lamb to become melt-in-your-mouth tender.
            During the slow cooking process, the sauce thickens and develops deep, complex flavors. Adjust the seasoning with salt as needed, and just before serving, stir in a dollop of creamy yogurt to balance the spices and add a luxurious texture. Garnish with freshly chopped cilantro for a burst of color and flavor. Lamb Rogan Josh is best enjoyed with steamed basmati rice or warm, fluffy naan bread, making it a perfect centerpiece for a comforting and satisfying meal.`,
    steps: [
      "Marinate lamb with yogurt, turmeric, chili powder",
      "Heat ghee, sauté cinnamon and cloves",
      "Add sliced onions, caramelize",
      "Add garlic and ginger paste",
      "Stir in fennel, cumin, and coriander",
      "Add lamb and brown",
      "Add tomato paste and water",
      "Simmer covered until lamb is tender",
      "Finish with yogurt and cilantro",
      "Serve with rice or naan"
    ]
  },
  {
    id: 5,
    title: 'Eggplant Parmesan',
    description: 'Baked eggplant with marinara and cheese.',
    recipe: `Eggplant Parmesan is a beloved Italian classic that combines the rich flavors of eggplant, tomato sauce, and gooey cheese. Begin by selecting firm, ripe eggplants and slicing them into rounds. To remove excess moisture and bitterness, sprinkle the slices generously with salt and let them sit for about 30 minutes. Rinse the eggplant under cold water and pat them dry with paper towels. Prepare a breading station with flour, beaten eggs, and breadcrumbs. Dip each slice of eggplant first into the flour, then the egg, and finally coat it in breadcrumbs, pressing lightly to ensure a good crust. Heat vegetable oil in a large skillet over medium heat and fry the eggplant slices in batches until they are golden brown and crispy on both sides. Drain the fried slices on paper towels to remove excess oil.
            In a deep baking dish, spread a layer of rich marinara sauce at the bottom. Arrange a layer of fried eggplant slices on top, then cover with more marinara sauce and sprinkle generously with shredded mozzarella and grated Parmesan cheese. Repeat the layering process until all ingredients are used, finishing with a layer of cheese on top. Cover the dish with foil and bake in a preheated oven at 180°C (350°F) for about 25 minutes, then remove the foil and bake for an additional 10–15 minutes until the cheese is bubbly and golden brown. Let the Eggplant Parmesan rest for at least 10 minutes before serving to allow the layers to set. Serve with a crisp green salad and warm garlic bread for a complete Italian meal experience.`,
    steps: [
      "Slice eggplants, sprinkle with salt",
      "Rinse and pat dry",
      "Dip slices in flour, eggs, and breadcrumbs",
      "Fry eggplant slices until golden",
      "Layer eggplant with marinara and cheese",
      "Repeat layers, finish with cheese",
      "Bake until bubbly and golden",
      "Rest before serving with salad and bread"
    ]
  },
  {
    id: 6,
    title: 'Ratatouille',
    description: 'Colorful French vegetable medley.',
    recipe: `Ratatouille is a visually stunning and delicious French vegetable medley that requires careful preparation and layering of fresh produce. Begin by thoroughly chopping an assortment of fresh vegetables including eggplant, zucchini, bell peppers, and ripe tomatoes into uniform pieces to ensure even cooking. In a large skillet, heat a generous amount of olive oil and sauté finely diced onions and minced garlic until they become fragrant and translucent. Gradually add the chopped vegetables to the pan, starting with the firmest ones like eggplant and bell peppers. Stir gently to combine, allowing the flavors to blend as they cook. Once the vegetables begin to soften, season them generously with aromatic thyme, fresh basil, and a hint of rosemary for a deep herbaceous flavor.
            Let the vegetables simmer on low heat, stirring occasionally to prevent sticking, until they are tender but not mushy, and their juices have melded into a rich sauce. For a traditional presentation, thinly slice additional eggplant, zucchini, and tomatoes, then arrange them in a spiral pattern atop the cooked vegetable mixture in an oven-safe dish. This creates the classic ratatouille appearance with alternating colors and textures. Drizzle with olive oil, season with a pinch of salt and pepper, and cover with foil. Bake the dish in a preheated oven until the vegetables are fully tender and the edges begin to caramelize, removing the foil towards the end for a slightly crisp top.
            Once baked, allow the ratatouille to rest briefly to let the flavors meld together. Serve warm, garnished with fresh basil and accompanied by slices of crusty bread for soaking up the rich, herb-infused sauce. This dish highlights the beauty of simple, fresh ingredients prepared with care, creating a meal that’s both comforting and elegant.`,
    steps: [
      "Chop eggplant, zucchini, bell peppers, and tomatoes",
      "Sauté onions and garlic",
      "Add chopped vegetables to pan",
      "Season with thyme, basil, and rosemary",
      "Simmer until vegetables are tender",
      "Arrange sliced veggies in a spiral",
      "Bake until golden and soft",
      "Serve warm with crusty bread"
    ]
  },
  {
    id: 7,
    title: 'Mushroom Risotto',
    description: 'Creamy risotto with mushrooms.',
    recipe: `Mushroom Risotto is a classic Italian comfort dish that requires patience and attention to detail. Begin by melting a generous amount of butter in a large skillet or wide-bottomed pan, then add finely chopped onions and minced garlic. Sauté them over medium heat until they become translucent and release their fragrant aroma, creating the flavor base for the risotto. Once the onions and garlic are softened, add Arborio rice, stirring constantly to toast the grains evenly. This toasting process enhances the rice’s nutty flavor and prepares it for absorbing liquid.
            Pour in a splash of dry white wine and stir continuously, allowing the wine to reduce and infuse the rice with its delicate acidity. Once the wine has nearly evaporated, begin adding hot stock gradually, one ladleful at a time. With each addition, stir the risotto constantly to encourage the rice to release its starches, creating a creamy consistency. Continue this process patiently, ensuring the stock is almost fully absorbed before adding more, which takes about 20 minutes.
            Meanwhile, in a separate pan, sauté a generous portion of sliced mushrooms in butter until they are golden and fragrant. When the risotto is nearly done, fold in the sautéed mushrooms, blending their earthy flavor into the creamy rice. Keep stirring until the mixture becomes luscious and thick, with a velvety texture. Once the risotto has reached the perfect consistency, remove it from the heat and stir in freshly grated Parmesan cheese and chopped parsley for a burst of flavor and color.
            Serve the risotto immediately, spooning it into warm bowls and garnishing with additional Parmesan and parsley if desired. The dish’s rich, creamy texture and deep mushroom flavor make it a standout for any special occasion or comforting meal.`,
    steps: [
      "Sauté onions and garlic in butter",
      "Add Arborio rice and toast",
      "Pour in white wine and reduce",
      "Gradually add hot stock, stirring continuously",
      "Add sautéed mushrooms",
      "Stir until creamy",
      "Finish with Parmesan and parsley",
      "Serve immediately"
    ]
  },
  {
    id: 8,
    title: 'Coq au Vin',
    description: 'French chicken braised in wine.',
    recipe: `Coq au Vin is a traditional French dish that showcases the rich flavors of chicken slowly braised in red wine with aromatic vegetables. To begin, marinate chicken pieces—typically bone-in thighs and drumsticks—in a mixture of robust red wine, aromatic herbs such as thyme and bay leaf, and minced garlic. Let the chicken soak overnight, allowing the wine and herbs to deeply infuse the meat with flavor.
            Once marinated, remove the chicken from the wine and pat it dry. Heat a generous amount of butter in a heavy-bottomed Dutch oven or large pot, and brown the chicken pieces on all sides to develop a rich golden crust. Remove the browned chicken and set it aside. In the same pot, add sliced onions, diced carrots, and whole or halved mushrooms, sautéing them until they begin to soften and caramelize, adding layers of flavor to the base.
            Deglaze the pot by pouring in the reserved red wine marinade, scraping up the browned bits from the bottom to enrich the sauce. Add a ladle of rich chicken stock to the pot, return the browned chicken to the pan, and bring the mixture to a gentle simmer. Cover and cook slowly for an extended period, typically an hour or more, until the chicken becomes meltingly tender and infused with the deep, wine-based sauce.
            Before serving, sprinkle the dish with freshly chopped parsley for a burst of color and freshness. Coq au Vin is traditionally accompanied by boiled or mashed potatoes, which soak up the rich and flavorful sauce. Each bite combines tender chicken, hearty vegetables, and the complex, wine-infused broth that epitomizes rustic French comfort food.`,
    steps: [
      "Marinate chicken in red wine, herbs, and garlic overnight",
      "Brown chicken pieces in butter",
      "Add onions, carrots, and mushrooms",
      "Deglaze pan with wine",
      "Add stock and simmer",
      "Cook until chicken is tender",
      "Garnish with parsley",
      "Serve with potatoes"
    ]
  },
  {
    id: 9,
    title: 'Thai Green Curry',
    description: 'Spicy curry with coconut milk and vegetables.',
    recipe: `Thai Green Curry is a vibrant and aromatic dish that fuses the bold flavors of Southeast Asian cuisine into a single, comforting bowl. The preparation begins with the creation of a rich green curry paste, blending together green chilies, lemongrass, galangal, garlic, shallots, and fragrant herbs. This paste is the foundation of the curry's signature flavor. In a large wok or saucepan, heat coconut oil and sauté the green curry paste until it becomes fragrant and the oils release the essential aromas.
            Add bite-sized pieces of chicken, allowing them to absorb the curry paste and begin to brown slightly. Pour in smooth, creamy coconut milk, which tempers the spice of the paste and creates a luscious sauce. Stir to combine, bringing the mixture to a gentle simmer. Next, incorporate a medley of colorful vegetables such as bell peppers, bamboo shoots, and zucchini, adding texture and freshness to the dish.
            Season the curry with fish sauce for umami depth and a hint of sugar to balance the heat. Let the curry simmer until the chicken is tender and the vegetables are perfectly cooked. Just before serving, garnish with fresh Thai basil leaves for an herbal note and a squeeze of lime for brightness. Serve the curry hot alongside a bowl of steamed jasmine rice to soak up the spicy and creamy sauce, making for a satisfying and authentic Thai dining experience.`,
    steps: [
      "Prepare green curry paste",
      "Sauté curry paste in coconut oil",
      "Add chicken and cook",
      "Pour in coconut milk",
      "Add vegetables and simmer",
      "Season with fish sauce and sugar",
      "Garnish with basil and lime",
      "Serve with jasmine rice"
    ]
  },
  {
    id: 10,
    title: 'Lasagna',
    description: 'Layered pasta with meat and béchamel.',
    recipe: `Lasagna is the epitome of Italian comfort food, crafted from layers of rich sauces and tender pasta sheets. To begin, prepare a hearty meat sauce by browning ground beef with onions and garlic until golden. Add crushed tomatoes, herbs like basil and oregano, and simmer until the sauce thickens and melds the flavors. In a separate pan, cook a creamy béchamel sauce by whisking butter, flour, and milk until smooth and velvety.
            In a deep baking dish, lay the foundation with sheets of pasta, followed by generous layers of meat sauce and béchamel. Continue building the layers, repeating with pasta, meat sauce, and béchamel, ensuring each layer is evenly spread for perfect texture and flavor. Finish with a final layer of béchamel sauce, smoothing it across the top. Sprinkle with a generous amount of grated cheese, such as Parmesan or mozzarella, to create a bubbling, golden crust during baking.
            Bake the lasagna in a preheated oven until the top turns beautifully golden and the edges start to crisp. Let the dish rest for a few minutes after baking, allowing the layers to set and making it easier to slice. Serve with a crisp side salad and warm, crusty bread for a meal that is both indulgent and satisfying, perfect for family gatherings or cozy dinners at home.`,
    steps: [
      "Prepare meat sauce with ground beef and tomato",
      "Cook béchamel sauce",
      "Layer pasta, meat sauce, and béchamel",
      "Repeat layers, ending with béchamel",
      "Sprinkle with cheese",
      "Bake until bubbly and golden",
      "Rest before serving"
    ]
  },
  {
    id: 11,
    title: 'Stuffed Bell Peppers',
    description: 'Bell peppers filled with rice and meat.',
    recipe: `Stuffed bell peppers are a comforting and flavorful dish that brings together vibrant vegetables and a savory filling. Begin by preparing the filling: cook rice until fluffy, then combine it with ground meat such as beef or turkey, finely chopped onions, garlic, and an array of aromatic spices like paprika, cumin, and oregano. Mix thoroughly to ensure the flavors meld together.
            Next, carefully slice the tops off colorful bell peppers and remove their seeds and membranes, creating hollow vessels ready to be filled. Spoon the prepared rice and meat mixture into each bell pepper, pressing down slightly to pack the filling neatly. Arrange the stuffed peppers upright in a deep baking dish, ensuring they are snug and secure.
            Pour a rich, seasoned tomato sauce over and around the peppers, allowing the sauce to seep into the filling during baking. Cover the dish with foil and bake in a preheated oven until the peppers are tender and the filling is fully cooked, with the flavors of the sauce and stuffing blending beautifully. Uncover for the last few minutes of baking to let the tops of the peppers develop a light golden crust.
            Let the dish rest briefly before serving to allow the flavors to settle. Serve the stuffed bell peppers with a crisp, refreshing salad and a side of warm, crusty bread to soak up the delicious sauce. This dish is not only satisfying but also visually stunning, making it perfect for family dinners or entertaining guests.`,
    steps: [
      "Prepare filling with rice, ground meat, and spices",
      "Cut tops off bell peppers and remove seeds",
      "Fill peppers with rice mixture",
      "Arrange in baking dish",
      "Pour tomato sauce over peppers",
      "Bake until peppers are tender",
      "Serve with salad"
    ]
  },
  {
    id: 12,
    title: 'Shepherd’s Pie',
    description: 'Classic comfort food with meat and mashed potatoes.',
    recipe: `Shepherd’s Pie is a rich, meaty dish topped with a luscious layer of creamy mashed potatoes, embodying the essence of comfort food. Begin by browning ground meat such as lamb or beef in a skillet, adding finely chopped onions and diced carrots for sweetness and texture. As the meat browns, allow its juices to meld with the vegetables, creating a savory base. Stir in peas for a burst of freshness and pour in a rich gravy made from stock, tomato paste, and a hint of Worcestershire sauce, ensuring a flavorful filling.
            Once the meat mixture has thickened, spoon it into the bottom of a deep baking dish, spreading it evenly. Prepare a generous batch of buttery mashed potatoes, seasoned to perfection with salt, pepper, and a touch of cream. Dollop the mashed potatoes over the meat layer, spreading it gently with a spatula to cover the filling completely. Use a fork to create rustic peaks and ridges in the potato topping, which will turn delightfully golden and crispy in the oven.
            Bake the pie until the topping is beautifully browned and the filling is bubbling underneath, filling the kitchen with a mouthwatering aroma. Allow the Shepherd’s Pie to rest for a few minutes after baking to let the layers set and the flavors deepen. Serve generous portions of this classic dish with a side of green vegetables or a crisp salad, providing a hearty, satisfying meal perfect for family dinners or cozy gatherings.`,
    steps: [
      "Cook ground meat with onions and carrots",
      "Add peas and gravy",
      "Layer meat mixture in baking dish",
      "Top with mashed potatoes",
      "Bake until golden and bubbly",
      "Let rest before serving"
    ]
  },
  {
    id: 13,
    title: 'Biryani',
    description: 'Fragrant spiced rice with meat or vegetables.',
    recipe: `Biryani is a celebratory dish that brings together fragrant basmati rice, tender marinated meat, and a medley of warming spices. To begin, marinate the chosen meat—whether chicken, lamb, or even vegetables—in a mixture of yogurt, ginger-garlic paste, turmeric, cumin, coriander, and garam masala. Allow the flavors to meld for several hours, infusing the meat with aromatic richness. While the meat marinates, cook basmati rice until it is partially done, ensuring it remains firm for the layering process.
            In a heavy-bottomed pot, layer the marinated meat at the bottom, followed by a layer of partially cooked rice. Scatter golden fried onions over the layers for sweetness and crunch. Drizzle saffron-infused milk over the rice to impart a delicate aroma and a vibrant golden hue. Repeat the layering until all the meat and rice are used, finishing with a layer of rice and a final drizzle of saffron milk.
            Seal the pot with a tight-fitting lid or dough to trap the steam and cook over low heat, allowing the flavors to intermingle and the rice to absorb the essence of the meat and spices. The biryani should steam gently, resulting in perfectly cooked, separate grains of rice and succulent, flavorful meat. Once done, fluff the biryani gently to reveal the colorful layers and serve it hot with cooling raita, a crisp salad, and tangy pickles for a complete feast that’s as festive as it is satisfying.`,
    steps: [
      "Marinate meat with spices and yogurt",
      "Cook basmati rice until partially done",
      "Layer meat and rice with fried onions",
      "Add saffron milk",
      "Cover and cook on low heat",
      "Serve with raita"
    ]
  },
  {
    id: 14,
    title: 'Duck à l’Orange',
    description: 'French duck with orange sauce.',
    recipe: `Duck à l’Orange is a classic French dish that masterfully balances the richness of crispy duck with the brightness of a tangy orange sauce. The preparation begins with scoring the fatty skin of the duck breast to help render the fat and create a beautifully crisp exterior. The duck is seared skin-side down in a hot pan until the skin turns golden and the fat has rendered, then transferred to the oven to finish roasting until the meat reaches a perfect medium rare, maintaining its juiciness.
            While the duck roasts, the star of the dish—the orange sauce—is prepared. Freshly squeezed orange juice and zest are combined with sugar and vinegar to create a harmonious blend of sweet and sour flavors. The pan used for searing the duck is deglazed with white wine or stock, lifting the fond from the bottom, and then the orange mixture is added. The sauce is simmered and reduced until it becomes thick and glossy, perfect for draping over the duck.
            Once the duck is cooked to perfection, it is rested to allow the juices to redistribute. The meat is sliced into elegant portions and plated alongside seasonal vegetables, with the orange sauce generously spooned over the top. Duck à l’Orange is a dish that celebrates bold flavors and precise techniques, offering a luxurious dining experience that’s both savory and citrusy.`,
    steps: [
      "Score and sear duck breast",
      "Roast until golden and crisp",
      "Prepare orange sauce with juice and zest",
      "Deglaze pan with wine",
      "Reduce sauce until thick",
      "Slice duck and drizzle with sauce",
      "Serve with vegetables"
    ]
  },
  {
    id: 15,
    title: 'Moussaka',
    description: 'Greek dish with layers of eggplant and meat.',
    recipe: `Moussaka is a traditional Greek dish known for its comforting layers of vegetables, rich meat sauce, and creamy béchamel topping. The preparation starts with slicing fresh eggplants, salting them to draw out any bitterness, and then rinsing and patting them dry. The eggplant slices are then fried or baked until they are golden and slightly softened, providing a delicious base for the layers to come.
            Meanwhile, a savory meat sauce is prepared using ground beef or lamb, onions, garlic, tomatoes, and a carefully balanced blend of Mediterranean spices like cinnamon and oregano. The meat is simmered gently, allowing the flavors to meld into a rich and hearty sauce.
            A creamy béchamel sauce is made by whisking butter and flour together to form a roux, adding milk, and cooking until the mixture thickens into a velvety sauce. A touch of nutmeg adds warmth and depth to the béchamel.
            Once all components are ready, the dish is assembled by layering slices of eggplant with the meat sauce and béchamel, repeating the layers to build a substantial and satisfying dish. The final layer is a generous spread of béchamel sauce, often topped with a sprinkling of grated cheese for extra indulgence.
            Moussaka is baked in the oven until the top is golden brown and bubbling. After baking, it is essential to let the moussaka rest for a while to allow the layers to set, making it easier to cut into perfect slices. Served warm with a crisp salad and rustic bread, moussaka offers a rich, flavorful taste of Greek culinary tradition.`,
    steps: [
      "Slice and salt eggplant",
      "Prepare meat sauce with tomato and spices",
      "Cook béchamel sauce",
      "Layer eggplant, meat, and béchamel",
      "Repeat layers, finishing with béchamel",
      "Sprinkle with grated cheese",
      "Bake until golden",
      "Rest before serving"
    ]
  }
];

export default recipes;