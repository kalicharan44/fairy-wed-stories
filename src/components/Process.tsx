import { MessageCircle, PenTool, Calendar, Sparkles, PartyPopper, ArrowUpRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { demoPhotos } from '../data/demoMedia';

const Process = () => {
  // Color palette matching Services component
  const colors = {
    champagne: {
      100: "#FFF1F5",
      200: "#F4C6D5",
      300: "#EFB2C5",
      400: "#E8A0B8",
      500: "#D97D9B",
      600: "#A63F63",
    },
    blush: {
      100: "#FFF1F5",
      200: "#F4C6D5",
      300: "#EFB2C5",
      400: "#E8A0B8",
      500: "#D97D9B",
      600: "#A63F63",
    },
    roseGold: {
      100: "#fae9e5",
      200: "#f5d3cc",
      300: "#f0bdb3",
      400: "#e0bfb8",
      500: "#d4a59a",
      600: "#c68b7c",
    }
  };

  const steps = [
    {
      icon: MessageCircle,
      title: 'Initial Consultation',
      description: 'We discuss your vision, preferences, and budget to understand your dream wedding',
      color: 'blush',
      image: demoPhotos.details
    },
    {
      icon: PenTool,
      title: 'Design & Planning',
      description: 'Our designers create detailed plans and mood boards tailored to your style',
      color: 'champagne',
      image: demoPhotos.reception
    },
    {
      icon: Calendar,
      title: 'Timeline Creation',
      description: 'We develop a comprehensive timeline ensuring every detail is perfectly coordinated',
      color: 'roseGold',
      image: demoPhotos.ceremony
    },
    {
      icon: Sparkles,
      title: 'Setup & Styling',
      description: 'Our team transforms your venue with exquisite decorations and attention to detail',
      color: 'blush',
      image: demoPhotos.garden
    },
    {
      icon: PartyPopper,
      title: 'Your Perfect Day',
      description: 'Relax and enjoy your magical celebration while we ensure everything runs smoothly',
      color: 'champagne',
      image: demoPhotos.couple
    }
  ];

  // Animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="relative py-32 overflow-hidden -mt-48" style={{ 
      background: `linear-gradient(white 0%, ${colors.champagne[100]} 100%)`
    }}>
      {/* Decorative elements */}
      <div 
        className="absolute top-0 left-0 w-[30rem] h-[30rem] rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background: `radial-gradient(${colors.champagne[300]}, transparent 70%)`,
          filter: 'blur(80px)'
        }}
      ></div>
      <div 
        className="absolute bottom-0 right-0 w-[25rem] h-[25rem] rounded-full opacity-5 translate-x-1/2 translate-y-1/2 pointer-events-none"
        style={{
          background: `radial-gradient(${colors.blush[300]}, transparent 70%)`,
          filter: 'blur(60px)'
        }}
      ></div>

      <div className="max-w-8xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="text-center mb-10 sm:mb-16 lg:mb-24"
        >
          <div className="inline-block relative">
            <Sparkles 
              className="absolute -top-8 -left-8 w-12 h-12 animate-pulse"
              style={{ color: colors.champagne[400] }} 
            />
            <Sparkles 
              className="absolute -bottom-6 -right-6 w-10 h-10 animate-pulse"
              style={{ 
                color: colors.blush[400],
                animationDelay: '0.5s'
              }} 
            />
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight relative">
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(45deg, ${colors.champagne[600]}, ${colors.blush[600]})`
                }}
              >
                Our Golden
              </span>
              <br />
              <span className="text-gray-800">Wedding Process</span>
            </h2>
          </div>
          <div 
            className="w-40 h-1.5 mx-auto mb-10 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${colors.champagne[400]}, ${colors.blush[400]})`
            }}
          ></div>
          <motion.p 
            className="text-xl text-gray-600 max-w-4xl mx-auto font-light"
            initial={{ opacity: 0 }}
            whileInView={{ 
              opacity: 1,
              transition: { delay: 0.3 }
            }}
            viewport={{ once: true }}
          >
            From initial consultation to your perfect day, we guide you through every step of creating your <span 
              className="font-medium"
              style={{ color: colors.champagne[600] }}
            >dream wedding</span>
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Desktop Timeline Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1.5 transform -translate-y-1/2" 
            style={{
              background: `linear-gradient(90deg, ${colors.blush[200]}, ${colors.champagne[200]}, ${colors.roseGold[300]})`,
              boxShadow: `0 0 10px rgba(232, 197, 71, 0.3)`
            }}>
          </div>
          
          {/* Mobile Timeline Line */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-1.5" 
            style={{
              background: `linear-gradient(to bottom, ${colors.blush[200]}, ${colors.champagne[200]}, ${colors.roseGold[300]})`,
              boxShadow: `0 0 10px rgba(232, 197, 71, 0.3)`
            }}>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colorMap = {
                blush: colors.blush,
                champagne: colors.champagne,
                roseGold: colors.roseGold
              };
              const color = colorMap[step.color as keyof typeof colorMap];

              return (
                <motion.div 
                  key={index} 
                  variants={item}
                  className="relative"
                >
                  <div className="flex md:flex-col items-center md:items-center text-center h-full">
                    {/* Step Card */}
                    <div className="group relative h-full w-full overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-lg transition-all duration-500 hover:shadow-xl sm:rounded-2xl sm:p-8"
                      style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${step.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'overlay'
                      }}
                    >
                      <div 
                        className="absolute top-0 left-0 w-full h-1"
                        style={{ background: color[500] }}
                      ></div>

                      {/* Icon Circle */}
                      <div className={`
                        relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center 
                        mx-auto mb-6 transition-transform duration-300 group-hover:scale-110
                      `}
                        style={{
                          backgroundColor: color[100],
                          color: color[600],
                          boxShadow: `0 4px 15px ${color[200]}`
                        }}
                      >
                        <Icon className="h-8 w-8 md:h-10 md:w-10" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 md:flex-none">
                        <h3 className="text-xl md:text-2xl font-serif font-semibold text-gray-800 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Step Number */}
                      <div className="hidden md:block absolute -top-3 -right-3 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ color: color[600] }}>
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ 
          opacity: 1, 
          scale: 1,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }}
        viewport={{ once: true }}
        className="text-center mt-28"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden px-16 py-6 rounded-full font-medium text-lg shadow-xl group"
          style={{
            background: `linear-gradient(45deg, ${colors.champagne[500]}, ${colors.blush[500]})`,
            color: 'white'
          }}
        >
          <span className="relative z-10 flex items-center justify-center">
            <Link to="/contact" className="inline-flex items-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <ArrowUpRight className="w-5 h-5 mr-3" /> Begin Your Wedding Story
            </Link>
          </span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-white bg-opacity-10"></div>
          </div>
        </motion.div>
        <p 
          className="mt-8 text-sm"
          style={{ color: colors.champagne[600] }}
        >
          Proposed planning outline · details to be confirmed
        </p>
      </motion.div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Process;
