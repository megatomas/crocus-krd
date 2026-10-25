import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, ChevronDown, ChevronUp, Star,
  TreePine, Flower2, ShoppingBag, Truck, Menu, X,
  MessageCircle, ArrowRight, Leaf, Droplets, Sun, Shield,
  ExternalLink, Send, Heart
} from 'lucide-react';

// ===== ANIMATION VARIANTS =====
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// ===== SECTION WRAPPER =====
function Section({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ===== HEADER =====
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#catalog', label: 'Каталог' },
    { href: '#about', label: 'О нас' },
    { href: '#products', label: 'Товары' },
    { href: '#faq', label: 'Вопросы' },
    { href: '#reviews', label: 'Отзывы' },
    { href: '#contacts', label: 'Контакты' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-green-900/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isScrolled ? 'bg-green-600' : 'bg-white/20 backdrop-blur-sm'}`}>
              <Leaf className={`w-5 h-5 ${isScrolled ? 'text-white' : 'text-white'}`} />
            </div>
            <div>
              <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-green-800' : 'text-white'}`}>
                КРОКУС
              </span>
              <span className={`block text-[10px] uppercase tracking-widest transition-colors duration-300 ${isScrolled ? 'text-green-600' : 'text-white/80'}`}>
                Садовый центр
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-green-500 ${isScrolled ? 'text-gray-700' : 'text-white/90'}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+79615044088" className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isScrolled ? 'text-green-700' : 'text-white'}`}>
              <Phone className="w-4 h-4" />
              +7 (961) 504-40-88
            </a>
            <a
              href="https://wa.me/+79615044088"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-green-600/30"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-green-800' : 'text-white'}`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 font-medium py-2 hover:text-green-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <a href="tel:+79615044088" className="flex items-center gap-2 text-green-700 font-semibold">
                  <Phone className="w-4 h-4" /> +7 (961) 504-40-88
                </a>
                <a
                  href="https://wa.me/+79615044088"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-5 py-3 bg-green-600 text-white font-medium rounded-full"
                >
                  Написать в WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ===== HERO =====
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/fe6b3b74-1c7b-410b-8e3e-780e89c3ef8e/_result.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-green-800/80 to-emerald-900/85" />
        {/* Remove old SVG pattern - replaced by image */}
        <div className="hidden" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm">Около 2000 видов растений в наличии</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
              Саженцы<br />
              <span className="text-gradient bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                растений
              </span><br />
              в Краснодаре
            </h1>

            <p className="text-lg text-white/70 max-w-lg mb-8 leading-relaxed">
              Садовый центр «Крокус» — выращиваем растения в собственных теплицах, подбираем сорта, устойчивые к южному солнцу
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-800 font-semibold rounded-full hover:bg-green-50 transition-all duration-200 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-0.5"
              >
                Открыть каталог
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/+79615044088?text=Здравствуйте! Пишу вам с сайта садового центра Крокус"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                Задать вопрос
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-3xl blur-2xl" />
              <div className="relative glass-dark rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <TreePine className="w-8 h-8" />, label: 'Хвойные', count: '500+' },
                    { icon: <Flower2 className="w-8 h-8" />, label: 'Цветущие', count: '800+' },
                    { icon: <Leaf className="w-8 h-8" />, label: 'Лиственные', count: '400+' },
                    { icon: <Sun className="w-8 h-8" />, label: 'Плодовые', count: '300+' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all duration-300 group">
                      <div className="text-green-300 mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                      <div className="text-white font-semibold">{item.label}</div>
                      <div className="text-white/60 text-sm">{item.count} сортов</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs uppercase tracking-widest">Листайте</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ===== CATEGORIES =====
function Categories() {
  const categories = [
    {
      icon: <TreePine className="w-7 h-7" />,
      title: 'Уличные растения',
      items: ['Хвойные деревья и кустарники', 'Лиственные деревья и кустарники', 'Плодовые культуры'],
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: <Flower2 className="w-7 h-7" />,
      title: 'Рассада',
      items: ['Декоративно-цветочные культуры', 'Декоративно-лиственные культуры'],
      color: 'from-pink-500 to-rose-600',
    },
    {
      icon: <ShoppingBag className="w-7 h-7" />,
      title: 'Сопутствующие товары',
      items: ['Грунты и дренаж', 'Удобрения и стимуляторы', 'Средства защиты растений'],
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: <Truck className="w-7 h-7" />,
      title: 'Услуги',
      items: ['Рулонный газон', 'Ландшафтный дизайн', 'Автополив'],
      color: 'from-blue-500 to-indigo-600',
    },
  ];

  return (
    <Section id="catalog" className="py-20 lg:py-32 bg-gray-50 leaf-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            Каталог
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Что мы предлагаем
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Полный ассортимент для создания идеального сада — от саженцев до комплексных услуг
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ===== ABOUT / ADVANTAGES =====
function About() {
  const advantages = [
    {
      icon: <ExternalLink className="w-6 h-6" />,
      title: 'Импорт любых растений',
      desc: 'За счёт прямых импортных поставок, мы привезем любое растение на 20-30% выгоднее рынка.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Приживаемость 99,9%',
      desc: 'Всё выращено и адаптировано под климат Краснодара и Краснодарского края.',
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      title: '"Под ключ"',
      desc: 'Доставка, посадка и автополив — всё от одной команды профессионалов.',
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Редкие коллекционные сорта',
      desc: 'В нашем центре есть то, чего нет у других. Уникальность — наша специализация.',
    },
  ];

  return (
    <Section id="about" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeInUp}>
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
              О нас
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Мы не просто продаём растения —{' '}
              <span className="text-gradient">мы создаём сады</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Садовый центр «Крокус». Мы выращиваем растения в собственных теплицах, подбираем сорта, устойчивые к южному солнцу, и создаём композиции, которые сохраняют красоту круглый год. Название «Крокус» символизирует пробуждение природы и новую жизнь — именно это мы дарим каждому участку.
            </p>
            <a
              href="#contacts"
              className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors group"
            >
              Связаться с нами
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <div className="space-y-5">
            <motion.div variants={scaleIn} className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://image.qwenlm.ai/generated-images/0c5b50a5-eba2-44a3-839c-3ef06e91a2ba/_result.png"
                alt="Садовый центр Крокус — теплица с растениями"
                className="w-full h-48 object-cover"
              />
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-5">
              {advantages.map((adv, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-50 to-green-50/50 rounded-2xl p-6 border border-gray-100 hover:border-green-200 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700 mb-4">
                    {adv.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{adv.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{adv.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ===== GALLERY =====
function Gallery() {
  const photos = [
    'https://crocus-krd.ru/wp-content/uploads/2025/12/1_.webp',
    'https://crocus-krd.ru/wp-content/uploads/2025/12/1_2.webp',
    'https://crocus-krd.ru/wp-content/uploads/2025/12/1_3.webp',
    'https://crocus-krd.ru/wp-content/uploads/2025/12/1_4.webp',
    'https://crocus-krd.ru/wp-content/uploads/2025/12/1_5.webp',
    'https://crocus-krd.ru/wp-content/uploads/2025/12/1_6.webp',
    'https://crocus-krd.ru/wp-content/uploads/2025/12/1_7.webp',
    'https://crocus-krd.ru/wp-content/uploads/2025/12/1_8.webp',
  ];

  return (
    <Section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            Галерея
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Наш садовый центр
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Фотографии из нашего питомника — убедитесь в качестве и ассортименте
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ scale: 1.03 }}
              className={`relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ${
                i === 0 || i === 5 ? 'md:col-span-2 md:row-span-2 aspect-square' : 'aspect-square'
              }`}
            >
              <img
                src={photo}
                alt={`Фото садового центра Крокус ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ===== PRODUCTS =====
function Products() {
  const products = [
    { name: 'Бересклет японский Кэти', price: '2 000', img: 'https://crocus-krd.ru/wp-content/uploads/2025/12/beresklet-yaponskij-keti.webp' },
    { name: 'Сосна мелкоцветковая Негиши', price: '9 000', img: 'https://crocus-krd.ru/wp-content/uploads/2025/12/sosna-melkocvetkovaya-negishi.webp' },
    { name: 'Падуб остролистный Аргентеа Маргината', price: '7 500', img: 'https://crocus-krd.ru/wp-content/uploads/2025/12/padub-ostrolistnyj-argentea-marginata.webp' },
    { name: 'Тис ягодный Фастигиата', price: '1 500', img: 'https://crocus-krd.ru/wp-content/uploads/2025/12/tis-yagodnyj-fastigiata.webp' },
    { name: 'Фотиния Фразера Литл Ред Робин', price: '1 800', img: 'https://crocus-krd.ru/wp-content/uploads/2025/12/fotiniya-frazera-litl-red-robin.webp' },
    { name: 'Сосна Веймутова Пендула', price: '41 000', img: 'https://crocus-krd.ru/wp-content/uploads/2025/12/sosna-vejmutova-pendula.webp' },
    { name: 'Ель колючая Ольденбург', price: '75 000', img: 'https://crocus-krd.ru/wp-content/uploads/2025/12/el-kolyuchaya-oldenburg.webp' },
    { name: 'Сосна черная Мари Брегон', price: '12 500', img: 'https://crocus-krd.ru/wp-content/uploads/2025/12/sosna-chernaya-mari-bregon.webp' },
    { name: 'Леукотоэ микс', price: '2 100', img: 'https://crocus-krd.ru/wp-content/uploads/2025/12/leukotoe-miks.webp' },
    { name: 'Смолосемянник Тобира Нана', price: '2 000', img: 'https://crocus-krd.ru/wp-content/uploads/2025/12/smolosemyannik-tobira-nana.webp' },
    { name: 'Плющ микс', price: '450', img: 'https://crocus-krd.ru/wp-content/uploads/2025/12/plyushh-miks.webp' },
    { name: 'Тис ягодный спираль', price: '70 000', img: 'https://crocus-krd.ru/wp-content/uploads/2025/12/tis-yagodnyj-spiral.webp' },
  ];

  return (
    <Section id="products" className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            Каталог
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Популярные товары
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Лучшие растения для вашего сада по выгодным ценам
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="aspect-square bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 text-sm lg:text-base mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-700">{product.price} ₽</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="text-center mt-12">
          <a
            href="https://crocus-krd.ru/shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-green-600/30"
          >
            Смотреть все товары
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </Section>
  );
}

// ===== BLOG =====
function Blog() {
  const articles = [
    {
      title: 'Какие растения выбрать для живой изгороди в Краснодаре',
      date: '09.11.2025',
      img: 'https://crocus-krd.ru/wp-content/uploads/2025/11/rasteniya-dlya-zhivoj-izgorodi-krasnodar.webp',
    },
    {
      title: 'Когда и как правильно сажать растения в южном климате',
      date: '09.11.2025',
      img: 'https://crocus-krd.ru/wp-content/uploads/2025/11/kalendar-posadok-dlya-krasnodara.webp',
    },
    {
      title: 'Как выбрать саженцы деревьев и кустарников для южного климата',
      date: '08.11.2025',
      img: 'https://crocus-krd.ru/wp-content/uploads/2025/11/kak-vybrat-sazhency-derevev-i-kustarnikov.webp',
    },
    {
      title: 'ТОП-10 растений, которые идеально переносят жару и солнце',
      date: '07.11.2025',
      img: 'https://crocus-krd.ru/wp-content/uploads/2025/11/top10.webp',
    },
  ];

  return (
    <Section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            Блог
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Полезные советы
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Делимся опытом, как ухаживать за растениями и сохранять красоту сада круглый год
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, i) => (
            <motion.a
              key={i}
              href="https://crocus-krd.ru/"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.img}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-xs text-gray-500 font-medium">{article.date}</span>
                <h3 className="font-semibold text-gray-900 mt-2 mb-3 group-hover:text-green-700 transition-colors line-clamp-3">
                  {article.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium">
                  Читать
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ===== FAQ =====
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Когда лучше всего сажать растения в Краснодаре?',
      a: 'Оптимальное время посадки — осень (сентябрь–ноябрь) и ранняя весна (март–апрель). Осенняя посадка особенно эффективна: земля ещё тёплая, солнце мягкое, корни успевают прижиться до жары.',
    },
    {
      q: 'Какие растения лучше всего переносят жару и солнце на юге?',
      a: 'Для южного климата подходят: можжевельники (Скайрокет, Голдстар, Тамарисцифолия), туи Смарагд и Брабант, бересклет японский, лавровишня, кизильник, а также многолетники — лаванда, гвоздика, очиток, гейхеры.',
    },
    {
      q: 'Почему растения не приживаются после посадки?',
      a: 'Самые частые причины: слишком частый или недостаточный полив, посадка в жару, неправильная глубина посадки, отсутствие дренажа, использование неадаптированных растений. Мы продаём только адаптированные саженцы, выращенные в условиях юга.',
    },
    {
      q: 'Какие растения выбрать для живой изгороди?',
      a: 'Лучше всего подходят: лавровишня, можжевельник, туя Смарагд или Брабант, кизильник блестящий, барбарис Тунберга. Они растут плотно, быстро и хорошо переносят солнце.',
    },
    {
      q: 'Как часто поливать растения летом в Краснодаре?',
      a: 'В жаркий период полив проводят 1–2 раза в неделю, но очень обильно, чтобы промачивалась корневая система. Частые маленькие поливы вредны — они стимулируют поверхностные корни, которые легко перегреваются.',
    },
    {
      q: 'Нужно ли мульчировать растения?',
      a: 'Да, мульча помогает сохранять влагу, снижать температуру почвы, подавлять сорняки и улучшать приживаемость. Для южного климата мульчирование — практически обязательное условие.',
    },
    {
      q: 'Есть ли гарантия на растения?',
      a: 'Да. Мы даём гарантию на приживаемость при условии соблюдения правил ухода и соблюдении рекомендаций специалиста.',
    },
    {
      q: 'Можно ли купить редкие сорта?',
      a: 'Да, в центре «Крокус» есть коллекционные сорта хвойных и декоративных растений, которые редко встречаются в рознице. Мы также можем привезти растения под заказ.',
    },
  ];

  return (
    <Section id="faq" className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Частые вопросы
          </h2>
          <p className="text-gray-600 text-lg">
            Ответы на самые популярные вопросы наших клиентов
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-green-200 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 lg:p-6 text-left"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'bg-green-600 text-white rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 lg:px-6 pb-5 lg:pb-6 text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ===== REVIEWS =====
function Reviews() {
  const reviews = [
    {
      name: 'Logvinov53',
      text: 'Большой выбор цветов и древесной растительности. Удобный подъезд. Выбирали дерево для торжественной посадки в КубГАУ. По душе пришелся платан.',
    },
    {
      name: 'Кожемякина Евгения',
      text: 'Хороший посадочный материал. Соотношение цены и качества нас устраивают. Большой ассортимент. Всё, что здесь покупали прекрасно прижилось даже при экстремальной жаре.',
    },
    {
      name: 'Arsen Kushkhov',
      text: 'Как по мне самый лучший питомник по ассортименту и отношению. Растения хорошие, того чего не было, заказали из Италии, через пару недель дошло.',
    },
    {
      name: 'Юлия Подолян',
      text: 'Хорошее местечко, большой выбор качественного посадочного материала! Помощь в доставке, всегда можно заказать что-то эксклюзивное по нормальной цене.',
    },
    {
      name: 'София-Катерина',
      text: 'Самая лучшая из Краснодарских площадок. Выбор растений потрясающий, размерный ряд на любой бюджет, порядок на территории.',
    },
    {
      name: 'Виктория Гринь',
      text: 'Хороший садовый центр! Небанальные растения, удобная экспозиция, очень приятно находиться. Ненавязчивые, вежливые, компетентные сотрудники.',
    },
  ];

  return (
    <Section id="reviews" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            Отзывы
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Что говорят наши клиенты
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">5.0</span>
            <span className="text-gray-500">на Яндекс Картах</span>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-2xl p-6 border border-gray-100 hover:border-green-200 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                  {review.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="text-center mt-10">
          <a
            href="https://yandex.ru/maps/org/krokus/75778321793/reviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors group"
          >
            Все отзывы на Яндекс Картах
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </Section>
  );
}

// ===== CTA BANNER =====
function CTABanner() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Готовы создать сад вашей мечты?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами для консультации — подберём растения именно для вашего участка и климата
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+79615044088"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-800 font-semibold rounded-full hover:bg-green-50 transition-all duration-200 hover:shadow-xl"
            >
              <Phone className="w-5 h-5" />
              Позвонить
            </a>
            <a
              href="https://wa.me/+79615044088"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              <Send className="w-5 h-5" />
              Написать в WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ===== CONTACTS =====
function Contacts() {
  return (
    <Section id="contacts" className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            Контакты
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Как нас найти
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div variants={fadeInUp} className="space-y-6">
            {/* Contact cards */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Телефон</h3>
                  <a href="tel:+79615044088" className="text-xl font-bold text-green-700 hover:text-green-800 transition-colors">
                    +7 (961) 504-40-88
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Ежедневно с 09:00 до 18:00</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:info@crocus-krd.ru" className="text-lg font-medium text-green-700 hover:text-green-800 transition-colors">
                    info@crocus-krd.ru
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Адрес</h3>
                  <p className="text-gray-700 font-medium">г. Краснодар, Ростовское ш., 30/1</p>
                  <a
                    href="https://yandex.ru/maps/org/krokus/75778321793/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-green-600 font-medium mt-2 hover:text-green-700"
                  >
                    Открыть на Яндекс Картах <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Режим работы</h3>
                  <p className="text-gray-700">Ежедневно с 09:00 до 18:00</p>
                </div>
              </div>
            </div>

            {/* Messengers */}
            <div className="flex gap-3">
              <a
                href="https://wa.me/+79615044088"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href="tel:+79615044088"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Позвонить
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-[500px] lg:h-auto">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=38.996418%2C45.101078&z=17&pt=38.996418,45.101078,pm2rdm"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ minHeight: '400px' }}
              title="Карта"
            />
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ===== FOOTER =====
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold">КРОКУС</span>
                <span className="block text-[10px] uppercase tracking-widest text-gray-400">Садовый центр</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Питомник растений в Краснодаре. Около 2000 видов деревьев, кустарников и цветов.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Каталог</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#catalog" className="hover:text-green-400 transition-colors">Уличные растения</a></li>
              <li><a href="#catalog" className="hover:text-green-400 transition-colors">Рассада</a></li>
              <li><a href="#catalog" className="hover:text-green-400 transition-colors">Сопутствующие товары</a></li>
              <li><a href="#catalog" className="hover:text-green-400 transition-colors">Услуги</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#about" className="hover:text-green-400 transition-colors">О нас</a></li>
              <li><a href="#faq" className="hover:text-green-400 transition-colors">Частые вопросы</a></li>
              <li><a href="#reviews" className="hover:text-green-400 transition-colors">Отзывы</a></li>
              <li><a href="#contacts" className="hover:text-green-400 transition-colors">Контакты</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-500" />
                <a href="tel:+79615044088" className="hover:text-green-400 transition-colors">+7 (961) 504-40-88</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-500" />
                <a href="mailto:info@crocus-krd.ru" className="hover:text-green-400 transition-colors">info@crocus-krd.ru</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>г. Краснодар, Ростовское ш., 30/1</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span>Ежедневно 09:00–18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Садовый центр «Крокус». Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/+79615044088"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://yandex.ru/maps/org/krokus/75778321793/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors"
            >
              <MapPin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ===== MAIN APP =====
export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Categories />
      <About />
      <Gallery />
      <Products />
      <Blog />
      <FAQ />
      <Reviews />
      <CTABanner />
      <Contacts />
      <Footer />
    </div>
  );
}
