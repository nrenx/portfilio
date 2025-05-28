'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MacOSDesktop } from '@/components/interactive/macos-desktop';

interface ProjectsSectionProps {
  className?: string;
}

export function ProjectsSection({ className }: ProjectsSectionProps) {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="projects"
      className={cn(
        'min-h-screen py-20 bg-muted/20 relative overflow-hidden',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Projects
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore my projects through an interactive macOS-style interface. Click on folders to discover different categories of work.
            </p>
          </motion.div>

          {/* macOS Interface Container */}
          <motion.div
            variants={itemVariants}
            className="macos-interface-container"
          >
            {/* Interactive macOS Desktop - Always Visible */}
            <div className="relative w-full h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
              <MacOSDesktop />
            </div>
          </motion.div>

          {/* Project Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            {[
              { label: 'Projects Completed', value: '10+' },
              { label: 'Technologies Used', value: '15+' },
              { label: 'Client Satisfaction', value: '100%' },
              { label: 'Years Experience', value: '2+' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-card/50 border border-border/50 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
