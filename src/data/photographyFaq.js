// Two- or three-word triggers map questions to the studio's photography answers.
// Answers avoid quoting prices or policies that have not been configured by the studio.
const faqTopics = [
  { answer: "Pricing depends on the service, session length, location, and deliverables. Share your shoot details on WhatsApp for a tailored quote.", phrases: ["photography price", "photo shoot price", "wedding photography price", "portrait session price", "event photography price", "brand shoot price", "photoshoot package price", "how much photography"] },
  { answer: "A quote is prepared around your date, location, coverage time, and the images or video you need. Send those details on WhatsApp to get a suitable option.", phrases: ["get price quote", "custom photo quote", "event price quote", "wedding price quote", "brand price quote", "session cost estimate", "photography cost estimate", "request photography quote"] },
  { answer: "Available packages depend on the type and size of the shoot. Tell us what you are planning and we can suggest a package that fits.", phrases: ["photography packages", "wedding packages", "portrait packages", "event packages", "brand packages", "package options", "photo package details", "available packages"] },
  { answer: "Please contact the studio with the service and date you have in mind. Any current offers or discounts can be confirmed directly before booking.", phrases: ["discount available", "current photography offer", "wedding photography discount", "student photography discount", "seasonal photo offer", "bulk booking discount", "special package offer", "any current offers"] },
  { answer: "The booking process and any advance payment depend on the selected service. Please ask the studio for the current booking terms before confirming.", phrases: ["booking advance", "booking deposit", "reserve my date", "confirm photo booking", "secure wedding date", "booking payment details", "photography booking process", "advance payment amount"] },
  { answer: "Accepted payment methods and payment timing should be confirmed with the studio when you receive your quote.", phrases: ["payment methods", "pay by card", "pay by upi", "payment schedule details", "installment payment option", "payment due date", "how can pay", "payment options available"] },
  { answer: "Cancellation and rescheduling terms vary by booking. Please contact the studio as soon as possible to discuss the options for your date.", phrases: ["cancel my booking", "cancel photo session", "reschedule my shoot", "change booking date", "move wedding date", "cancellation policy details", "reschedule booking terms", "postpone photo session"] },
  { answer: "Travel or out-of-area costs depend on the destination and schedule. Share the shoot location to confirm whether travel charges apply.", phrases: ["travel charges", "travel fee details", "outside city shoot", "destination wedding cost", "out of town photoshoot", "travel cost estimate", "location travel fees", "photographer travel expense"] },
  { answer: "Wedding coverage can be tailored to your ceremony and schedule. Share your date, venue, and the moments you want covered for a custom recommendation.", phrases: ["wedding photography", "wedding day coverage", "ceremony photo coverage", "wedding photo package", "bridal photography details", "groom portrait session", "wedding event photos", "marriage photography booking"] },
  { answer: "Pre-wedding sessions can be planned around your preferred location and style. Tell us your date ideas and the kind of images you would like.", phrases: ["pre wedding shoot", "couple photoshoot ideas", "engagement photo session", "save date photos", "romantic couple portraits", "engagement photography booking", "couple session location", "pre wedding package"] },
  { answer: "Portrait sessions can be arranged for individuals, families, or professional profiles. Tell us who the portraits are for and the look you want.", phrases: ["portrait photography", "individual portrait session", "family photo session", "professional headshots", "personal branding portraits", "studio portrait booking", "family portrait location", "portrait session details"] },
  { answer: "Maternity and newborn sessions are planned around your comfort and preferred timing. Contact the studio to discuss the best schedule and setting.", phrases: ["maternity photo session", "newborn photography session", "baby photo shoot", "pregnancy portrait ideas", "family newborn photos", "maternity shoot timing", "newborn session booking", "baby photography details"] },
  { answer: "Brand photography can include portraits, products, workspace, and behind-the-scenes images. Share your business and intended use to plan the shot list.", phrases: ["brand photography", "business brand shoot", "personal brand photos", "company profile photos", "workspace photo session", "brand content images", "business photoshoot details", "commercial brand portraits"] },
  { answer: "Product photography is planned around the products, background style, and where the images will be used. Share product details for a tailored quote.", phrases: ["product photography", "product photo shoot", "ecommerce product images", "catalogue product photos", "online store photography", "product image background", "commercial product shoot", "product photo quote"] },
  { answer: "Corporate headshots can be arranged for individuals or teams. Share the team size, location, and preferred style to plan the session.", phrases: ["corporate headshots", "team profile photos", "company staff portraits", "employee headshot session", "business profile photos", "office team photography", "linkedin profile photo", "corporate portrait booking"] },
  { answer: "Event coverage can be tailored to your schedule and venue. Tell us the event type, date, and key moments you want photographed.", phrases: ["event photography", "birthday event photos", "conference photo coverage", "launch event photographer", "party photography booking", "corporate event photos", "event date availability", "event photo package"] },
  { answer: "Instagram Reels and short-form video can be planned around your content goals, location, and format. Share the kind of reel you want to create.", phrases: ["instagram reels", "reel video shoot", "short form video", "social media content", "instagram content shoot", "brand reels package", "vertical video filming", "reels photography price"] },
  { answer: "Food and restaurant photography can cover dishes, menus, interiors, and team portraits. Share the venue and the images you need.", phrases: ["food photography", "restaurant photo shoot", "menu item photos", "cafe interior photos", "food delivery images", "chef portrait session", "restaurant brand photos", "food photo package"] },
  { answer: "The studio can discuss photo and video coverage based on your event and deliverables. Please describe whether you need still images, video, or both.", phrases: ["video coverage", "photo and video", "event videography", "wedding video coverage", "short film package", "video editing service", "cinematic wedding film", "photography videography quote"] },
  { answer: "Delivery timing depends on the size and type of shoot. The studio can confirm an estimated delivery date when discussing your booking.", phrases: ["photo delivery time", "when photos ready", "gallery delivery date", "wedding photo delivery", "edited pictures timeline", "event photos turnaround", "how long editing", "photo completion time"] },
  { answer: "Images are selected and edited for a consistent finished look. Specific retouching requests can be discussed before or after the session.", phrases: ["photo editing included", "image retouching details", "skin retouching request", "photo color correction", "edited gallery style", "retouching service cost", "editing style options", "advanced photo editing"] },
  { answer: "Final deliverables depend on your selected service and agreement. Ask the studio which formats, image count, and delivery method are included in your quote.", phrases: ["number of photos", "digital image delivery", "high resolution files", "final photo formats", "gallery download link", "photo deliverables included", "edited image count", "online photo gallery"] },
  { answer: "Raw files are not automatically included in every photography service. Please ask the studio about raw file availability and any related terms.", phrases: ["raw files included", "get raw photos", "unedited image files", "camera raw images", "raw image delivery", "original photo files", "raw files available", "unprocessed photos request"] },
  { answer: "You can share reference images, preferred colors, and examples of the mood you like. The photographer can use them to plan a style that suits your shoot.", phrases: ["photo style ideas", "share reference images", "natural photo style", "candid photography style", "editorial shoot mood", "photo inspiration board", "preferred editing look", "creative direction session"] },
  { answer: "The studio can help plan locations based on your shoot style and travel range. Share your city or preferred venue to discuss suitable options.", phrases: ["photo shoot location", "outdoor session ideas", "indoor studio location", "location recommendations", "shoot at venue", "location scouting help", "best portrait location", "destination shoot planning"] },
  { answer: "Please share your preferred date and location on WhatsApp. The photographer can check the calendar and confirm availability directly.", phrases: ["date availability", "photographer available date", "check wedding date", "available this weekend", "book date availability", "session date open", "is photographer free", "check event schedule"] },
  { answer: "Wear outfits that feel comfortable and fit the mood of your shoot. Coordinating colors and avoiding busy patterns can help create a cohesive gallery.", phrases: ["what should wear", "photoshoot outfit ideas", "wedding outfit photos", "family photo clothing", "portrait session clothes", "coordinate outfit colors", "outfit preparation tips", "clothing for photoshoot"] },
  { answer: "You do not need to know how to pose. The photographer can guide you through natural directions during the session.", phrases: ["how to pose", "posing guidance included", "feel awkward photos", "natural posing tips", "portrait pose direction", "couple posing help", "camera shy advice", "posing for photos"] },
  { answer: "Outdoor sessions depend on the weather and location. The studio can discuss backup timing or an indoor alternative if conditions change.", phrases: ["rain backup plan", "bad weather photoshoot", "outdoor shoot rain", "weather reschedule policy", "indoor backup location", "rainy wedding photos", "weather plan shoot", "postpone due weather"] },
  { answer: "Please ask the studio about print and album options for your service. Available sizes, materials, and pricing can be confirmed with your quote.", phrases: ["photo album options", "wedding album price", "printed photo package", "photo book order", "album design service", "large photo prints", "canvas print options", "print delivery details"] },
  { answer: "Image usage rights depend on the agreement and intended use. Tell the studio whether you need personal, business, advertising, or publication use.", phrases: ["photo usage rights", "commercial image license", "business image usage", "advertising photo rights", "photo copyright ownership", "social media image rights", "publication permission request", "image licensing terms"] },
  { answer: "If you have privacy or sharing preferences, discuss them with the studio before the shoot so they can be noted for your gallery and image use.", phrases: ["keep photos private", "do not post photos", "photo sharing privacy", "private client gallery", "social media permission", "confidential photography booking", "hide wedding photos", "image privacy request"] },
  { answer: "Please contact the studio with your delivery issue and booking details so they can check the gallery link and help restore access.", phrases: ["gallery link broken", "cannot download photos", "lost gallery access", "photos not opening", "download image issue", "gallery access expired", "missing photo files", "restore photo gallery"] },
  { answer: "The studio can discuss custom requests such as a specific theme, schedule, or combination of services. Send your idea on WhatsApp to check what is possible.", phrases: ["custom photography request", "special shoot idea", "unique photo concept", "custom event coverage", "combine photo services", "special location request", "themed photoshoot plan", "custom package details"] },
  { answer: "Please include the event or shoot type, date, location, and approximate coverage needed. Those details help the studio give a useful recommendation.", phrases: ["what details needed", "information for quote", "booking details required", "request photographer quote", "enquiry information needed", "plan my photography", "start booking enquiry", "share shoot requirements"] },
  { answer: "Consultations can help plan the schedule, style, and coverage. Contact the studio to arrange a conversation before confirming your shoot.", phrases: ["consultation appointment", "talk to photographer", "planning call booking", "discuss shoot details", "meet photographer first", "pre shoot consultation", "consultation availability", "schedule planning meeting"] },
  { answer: "Please share the number of people, location, and type of group session. The studio can suggest a setup that fits your group.", phrases: ["large group photos", "team group portrait", "family group session", "class group picture", "group photo location", "many people shoot", "group portrait quote", "large family photography"] },
  { answer: "Real estate photography can include property interiors, exteriors, and detail images. Share the property location and intended use to plan coverage.", phrases: ["real estate photography", "property listing photos", "house interior photos", "apartment photo shoot", "property exterior images", "rental listing photography", "architecture photo service", "real estate photo quote"] },
  { answer: "Please describe the issue and include your shoot date or gallery details. The studio can review your request and advise on the next step.", phrases: ["contact photographer support", "change my photo order", "fix photo request", "booking help request", "follow up enquiry", "ask about my booking", "photo service question", "need photographer help"] },
];

const additionalServiceTypes = [
  { label: "wedding photography", phrase: "wedding" },
  { label: "pre-wedding photography", phrase: "pre wedding" },
  { label: "engagement photography", phrase: "engagement" },
  { label: "portrait photography", phrase: "portrait" },
  { label: "family photography", phrase: "family" },
  { label: "maternity photography", phrase: "maternity" },
  { label: "newborn photography", phrase: "newborn" },
  { label: "event photography", phrase: "event" },
  { label: "birthday photography", phrase: "birthday" },
  { label: "corporate photography", phrase: "corporate" },
  { label: "headshot photography", phrase: "headshot" },
  { label: "brand photography", phrase: "brand" },
  { label: "product photography", phrase: "product" },
  { label: "food photography", phrase: "food" },
  { label: "restaurant photography", phrase: "restaurant" },
  { label: "Instagram Reels", phrase: "instagram reels" },
  { label: "social media photography", phrase: "social media" },
  { label: "video production", phrase: "video" },
  { label: "real estate photography", phrase: "real estate" },
  { label: "architecture photography", phrase: "architecture" },
  { label: "fashion photography", phrase: "fashion" },
  { label: "graduation photography", phrase: "graduation" },
  { label: "sports photography", phrase: "sports" },
  { label: "travel photography", phrase: "travel" },
  { label: "pet photography", phrase: "pet" },
  { label: "kids photography", phrase: "kids" },
  { label: "school photography", phrase: "school" },
  { label: "commercial photography", phrase: "commercial" },
  { label: "luxury photography", phrase: "luxury" },
  { label: "couple photography", phrase: "couple" },
];

const serviceFaqDimensions = [
  {
    phrase: "price",
    answer: (service) => `Pricing for ${service} depends on the session length, location, and final deliverables. Share your requirements for an accurate quote.`,
  },
  {
    phrase: "booking",
    answer: (service) => `To book ${service}, share your preferred date, city, and requirements. The photographer can confirm availability and next steps.`,
  },
  {
    phrase: "location",
    answer: (service) => `The location for ${service} depends on your creative goals. Suggest a venue or city and the studio can discuss practical options.`,
  },
  {
    phrase: "coverage",
    answer: (service) => `Coverage time for ${service} depends on your schedule and planned shots. Share a timeline to discuss a suitable coverage plan.`,
  },
  {
    phrase: "preparation",
    answer: (service) => `To prepare for ${service}, share references, preferences, and important moments. You can discuss a shot list with the photographer before the session.`,
  },
  {
    phrase: "style",
    answer: (service) => `The style for ${service} can be guided by reference images, colors, and mood. Share examples to discuss a consistent approach.`,
  },
  {
    phrase: "delivery",
    answer: (service) => `The delivery timeline for ${service} depends on the shoot size and editing needs. Confirm the expected schedule with the studio when booking.`,
  },
  {
    phrase: "availability",
    answer: (service) => `Availability for ${service} depends on your preferred date, city, and schedule. Share your timing and the studio can confirm the most suitable option.`,
  },
  {
    phrase: "customization",
    answer: (service) => `Customization for ${service} can be discussed around your mood, location, and final use. Share the details you want included to shape the session plan.`,
  },
  {
    phrase: "editing",
    answer: (service) => `Editing for ${service} is tailored to your preferred finish, retouching needs, and final gallery style. Share your reference examples to guide the edit.`,
  },
];

// 30 service types x 10 common questions = 300 additional response topics.
const additionalFaqTopics = additionalServiceTypes.flatMap((service) =>
  serviceFaqDimensions.map((dimension) => ({
    answer: dimension.answer(service.label),
    phrases: [`${service.phrase} ${dimension.phrase}`],
  }))
);

const allFaqTopics = [...faqTopics, ...additionalFaqTopics];

export const photographyFaqs = allFaqTopics.flatMap(({ answer, phrases }) =>
  phrases.map((phrase) => ({ phrase, answer }))
);
