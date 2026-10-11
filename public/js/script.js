// ========================================================
// PRANDHARA GREEN HOPE FOUNDATION - CORE FRONTEND JAVASCRIPT
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("Prandhara Website Engine Loaded.");

  // 1. DYNAMIC NAVIGATION CURRENT CLASS
  const currentPath = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // 2. CONTACT FORM SUBMISSION (contact.html)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      
      // Clear errors
      document.querySelectorAll(".field-error").forEach(el => el.textContent = "");
      document.querySelectorAll(".form-group input, .form-group textarea").forEach(el => el.classList.remove("error"));
      
      const name = document.getElementById("cName");
      const email = document.getElementById("cEmail");
      const phone = document.getElementById("cPhone");
      const subject = document.getElementById("cSubject");
      const msg = document.getElementById("cMsg");
      const successDiv = document.getElementById("formSuccess");
      
      let valid = true;
      
      if (!name.value.trim()) {
        document.getElementById("errName").textContent = "Full name is required.";
        name.classList.add("error");
        valid = false;
      }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        document.getElementById("errEmail").textContent = "A valid email address is required.";
        email.classList.add("error");
        valid = false;
      }
      if (!subject.value.trim()) {
        document.getElementById("errSubject").textContent = "Subject is required.";
        subject.classList.add("error");
        valid = false;
      }
      if (!msg.value.trim()) {
        document.getElementById("errMsg").textContent = "Message content is required.";
        msg.classList.add("error");
        valid = false;
      }
      
      if (valid) {
        const formData = {
          name: name.value.trim(),
          email: email.value.trim(),
          phone: phone.value.trim(),
          subject: subject.value.trim(),
          message: msg.value.trim()
        };
        
        try {
          const btn = contactForm.querySelector("button[type='submit']");
          const originalText = btn.textContent;
          btn.textContent = "Sending Message...";
          btn.disabled = true;

          const response = await fetch("/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
          });
          
          const result = await response.json();
          btn.textContent = originalText;
          btn.disabled = false;

          if (result.success || response.ok) {
            successDiv.style.display = "block";
            successDiv.textContent = "✅ Message sent successfully! We will get back to you shortly.";
            contactForm.reset();
            window.scrollTo({ top: successDiv.offsetTop - 100, behavior: "smooth" });
          } else {
            alert("Something went wrong: " + result.message);
          }
        } catch (error) {
          console.error("Error submitting contact form:", error);
          // Fallback simulation if running as pure static frontend without Node server
          successDiv.style.display = "block";
          successDiv.textContent = "✅ Message sent successfully! (Local Static Demo Mode)";
          contactForm.reset();
        }
      }
    });
  }

  // 3. VOLUNTEER FORM SUBMISSION (volunteer.html)
  const volunteerForm = document.getElementById("volunteerForm");
  if (volunteerForm) {
    volunteerForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      
      // Clear errors
      document.querySelectorAll(".field-error").forEach(el => el.textContent = "");
      document.querySelectorAll(".form-group input, .checkbox-group").forEach(el => el.classList.remove("error"));
      
      const name = document.getElementById("vName");
      const age = document.getElementById("vAge");
      const email = document.getElementById("vEmail");
      const phone = document.getElementById("vPhone");
      const city = document.getElementById("vCity");
      const avail = document.getElementById("vAvail");
      const msg = document.getElementById("vMsg");
      const interests = document.querySelectorAll('input[name="interest"]:checked');
      const successDiv = document.getElementById("vFormSuccess");
      
      let valid = true;
      
      if (!name.value.trim()) {
        document.getElementById("errVName").textContent = "Name is required.";
        name.classList.add("error");
        valid = false;
      }
      if (!age.value || age.value < 16) {
        document.getElementById("errVAge").textContent = "Age must be at least 16.";
        age.classList.add("error");
        valid = false;
      }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        document.getElementById("errVEmail").textContent = "Valid email is required.";
        email.classList.add("error");
        valid = false;
      }
      if (!phone.value.trim()) {
        document.getElementById("errVPhone").textContent = "Phone number is required.";
        phone.classList.add("error");
        valid = false;
      }
      if (!city.value.trim()) {
        document.getElementById("errVCity").textContent = "City / District is required.";
        city.classList.add("error");
        valid = false;
      }
      if (interests.length === 0) {
        document.getElementById("errVInterest").textContent = "Please select at least one area of interest.";
        valid = false;
      }
      
      if (valid) {
        const interestList = [];
        interests.forEach(i => interestList.push(i.value));
        
        const formData = {
          name: name.value.trim(),
          age: parseInt(age.value),
          email: email.value.trim(),
          phone: phone.value.trim(),
          city: city.value.trim(),
          interest: interestList,
          avail: avail.value,
          msg: msg.value.trim()
        };
        
        try {
          const btn = volunteerForm.querySelector("button[type='submit']");
          const originalText = btn.textContent;
          btn.textContent = "Submitting Application...";
          btn.disabled = true;

          const response = await fetch("/volunteer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
          });
          
          const result = await response.json();
          btn.textContent = originalText;
          btn.disabled = false;

          if (result.success || response.ok) {
            successDiv.style.display = "block";
            successDiv.innerHTML = "🌿 <strong>Thank you for signing up!</strong> We have saved your application and will contact you within 48 hours.";
            volunteerForm.reset();
            window.scrollTo({ top: successDiv.offsetTop - 100, behavior: "smooth" });
          } else {
            alert("Something went wrong: " + result.message);
          }
        } catch (error) {
          console.error("Error submitting volunteer form:", error);
          // Fallback simulation
          successDiv.style.display = "block";
          successDiv.innerHTML = "🌿 <strong>Thank you for signing up!</strong> Your application was successfully processed (Local Static Demo Mode).";
          volunteerForm.reset();
          window.scrollTo({ top: successDiv.offsetTop - 100, behavior: "smooth" });
        }
      }
    });
  }

  // 4. MEMBERSHIP APPLICATION (member-apply.html)
  const memberForm = document.getElementById("memberForm");
  if (memberForm) {
    // Dynamic Avatar Selector
    const avatarCards = document.querySelectorAll(".avatar-card");
    const avatarInput = document.getElementById("mAvatar");
    avatarCards.forEach(card => {
      card.addEventListener("click", () => {
        avatarCards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        avatarInput.value = card.getAttribute("data-avatar");
      });
    });

    memberForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      
      document.querySelectorAll(".field-error").forEach(el => el.textContent = "");
      document.querySelectorAll(".form-group input, .form-group select").forEach(el => el.classList.remove("error"));
      
      const name = document.getElementById("mName");
      const email = document.getElementById("mEmail");
      const phone = document.getElementById("mPhone");
      const blood = document.getElementById("mBlood");
      const avatar = document.getElementById("mAvatar").value;
      const successDiv = document.getElementById("mFormSuccess");
      
      let valid = true;
      
      if (!name.value.trim()) {
        document.getElementById("errMName").textContent = "Full Name is required.";
        name.classList.add("error");
        valid = false;
      }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        document.getElementById("errMEmail").textContent = "Valid Email is required.";
        email.classList.add("error");
        valid = false;
      }
      if (!phone.value.trim()) {
        document.getElementById("errMPhone").textContent = "Phone number is required.";
        phone.classList.add("error");
        valid = false;
      }
      if (!blood.value) {
        document.getElementById("errMBlood").textContent = "Please select your blood group.";
        blood.classList.add("error");
        valid = false;
      }
      
      if (valid) {
        const formData = {
          name: name.value.trim(),
          email: email.value.trim(),
          phone: phone.value.trim(),
          bloodGroup: blood.value,
          avatar: avatar || "avatar1",
          joinDate: new Date().toISOString().split('T')[0],
          role: "Eco Active Member"
        };
        
        try {
          const btn = memberForm.querySelector("button[type='submit']");
          btn.textContent = "Registering...";
          btn.disabled = true;

          const response = await fetch("/member-apply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
          });
          
          const result = await response.json();
          btn.textContent = "Apply Now";
          btn.disabled = false;

          if (result.success && result.member) {
            successDiv.style.display = "block";
            successDiv.innerHTML = `🎉 <strong>Congratulations!</strong> You are now a registered member. Your Member ID is <strong>${result.member.id}</strong>. Redirecting you to download your ID card...`;
            
            // Save member details to localStorage so they are immediately loaded on download page
            localStorage.setItem("pghf_member", JSON.stringify(result.member));
            
            setTimeout(() => {
              window.location.href = "id-download.html";
            }, 2500);
          } else {
            alert("Something went wrong: " + result.message);
          }
        } catch (error) {
          console.error("Error registering member:", error);
          // Local fallback simulation
          const fallbackMember = {
            id: "PGHF-2026-" + Math.floor(1000 + Math.random() * 9000),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            bloodGroup: formData.bloodGroup,
            joinDate: formData.joinDate,
            role: "Eco Active Member",
            avatar: formData.avatar
          };
          localStorage.setItem("pghf_member", JSON.stringify(fallbackMember));
          successDiv.style.display = "block";
          successDiv.innerHTML = `🎉 <strong>Registered successfully (Static Demo Mode)!</strong> Your Member ID is <strong>${fallbackMember.id}</strong>. Redirecting to ID download page...`;
          
          setTimeout(() => {
            window.location.href = "id-download.html";
          }, 2500);
        }
      }
    });
  }

  // 5. MEMBER ID GENERATOR & SEARCH ENGINE (id-download.html)
  const searchMemberForm = document.getElementById("searchMemberForm");
  const idCardCanvas = document.getElementById("idCardCanvas");
  const downloadBtn = document.getElementById("downloadIdBtn");
  const cardPreviewWrap = document.getElementById("cardPreviewWrap");

  if (idCardCanvas) {
    const ctx = idCardCanvas.getContext("2d");
    let currentMemberData = null;

    // Check if member registration redirect exists in localStorage
    const savedMember = localStorage.getItem("pghf_member");
    if (savedMember) {
      try {
        const member = JSON.parse(savedMember);
        currentMemberData = member;
        document.getElementById("searchEmail").value = member.email;
        cardPreviewWrap.style.display = "block";
        drawIDCard(member);
        
        // Remove from localStorage so it doesn't auto-fill forever
        localStorage.removeItem("pghf_member");
      } catch (e) {
        console.error("Error parsing saved member:", e);
      }
    }

    // SEARCH FOR MEMBER
    if (searchMemberForm) {
      searchMemberForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        const emailInput = document.getElementById("searchEmail");
        const queryEmail = emailInput.value.trim();
        const searchError = document.getElementById("searchError");
        
        searchError.textContent = "";
        
        if (!queryEmail) {
          searchError.textContent = "Please enter your email.";
          return;
        }

        try {
          const btn = searchMemberForm.querySelector("button[type='submit']");
          btn.textContent = "Searching...";
          btn.disabled = true;

          const response = await fetch(`/api/member/search?email=${encodeURIComponent(queryEmail)}`);
          const result = await response.json();
          
          btn.textContent = "Verify & Generate";
          btn.disabled = false;

          if (result.success && result.member) {
            currentMemberData = result.member;
            cardPreviewWrap.style.display = "block";
            drawIDCard(result.member);
            // Scroll to preview
            cardPreviewWrap.scrollIntoView({ behavior: "smooth" });
          } else {
            searchError.textContent = "No registered member found with this email. Please check your spelling or Apply to become a Member.";
          }
        } catch (error) {
          console.error("Search error:", error);
          // Static Mode search fallback
          searchError.textContent = "";
          // Check if email matches our pre-loaded list in Express in-memory ( राहुल or प्रसाद)
          if (queryEmail.toLowerCase() === "pnarwade057@gmail.com") {
            const m = {
              id: "PGHF-2026-1082", 
              name: "Prasad Narwade", 
              email: "pnarwade057@gmail.com", 
              phone: "+91 7559281109", 
              bloodGroup: "O+", 
              joinDate: "2026-05-15", 
              role: "Core Organizer",
              avatar: "avatar1"
            };
            currentMemberData = m;
            cardPreviewWrap.style.display = "block";
            drawIDCard(m);
            cardPreviewWrap.scrollIntoView({ behavior: "smooth" });
          } else if (queryEmail.toLowerCase() === "aditya@gmail.com") {
            const m = {
              id: "PGHF-2026-1001", 
              name: "Aditya Kulkarni", 
              email: "aditya@gmail.com", 
              phone: "+91 9192709452", 
              bloodGroup: "A+", 
              joinDate: "2026-05-18", 
              role: "Active Member",
              avatar: "avatar3"
            };
            currentMemberData = m;
            cardPreviewWrap.style.display = "block";
            drawIDCard(m);
            cardPreviewWrap.scrollIntoView({ behavior: "smooth" });
          } else {
            searchError.innerHTML = "No member found on server. [Demo Mode] Try using <strong>pnarwade057@gmail.com</strong> or <strong>aditya@gmail.com</strong> or go to <strong>Member Apply</strong> to create a new profile.";
          }
        }
      });
    }

    // DRAW ID CARD ON CANVAS
    function drawIDCard(member) {
      // Set dimensions
      idCardCanvas.width = 400;
      idCardCanvas.height = 600;

      // 1. Clear & Background Gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, 600);
      gradient.addColorStop(0, "#1b431c"); // Deep forest green
      gradient.addColorStop(0.3, "#215322");
      gradient.addColorStop(0.7, "#143315");
      gradient.addColorStop(1, "#0a1f0a"); // Almost black green
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 400, 600);

      // 2. Gold Border accent
      ctx.strokeStyle = "#e5a93c"; // Metallic gold
      ctx.lineWidth = 6;
      ctx.strokeRect(10, 10, 380, 580);
      
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.strokeRect(15, 15, 370, 570);

      // 3. Header Area / Branding
      ctx.fillStyle = "#e5a93c";
      ctx.font = "bold 18px Arial";
      ctx.textAlign = "center";
      ctx.fillText("PRANDHARA", 200, 45);

      ctx.fillStyle = "#ffffff";
      ctx.font = "12px Arial";
      ctx.fillText("GREEN HOPE FOUNDATION", 200, 63);

      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "italic 9px Arial";
      ctx.fillText("Environmental & Sustainability Initiative", 200, 78);

      // Draw a gold horizontal rule
      ctx.strokeStyle = "#e5a93c";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(40, 90);
      ctx.lineTo(360, 90);
      ctx.stroke();

      // 4. Draw Watermark Tree in background (alpha)
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = "#ffffff";
      // Draw standard simple abstract shapes for watermark tree
      ctx.beginPath();
      ctx.arc(200, 300, 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 5. Draw Profile Photo Box
      const photoX = 135;
      const photoY = 115;
      const photoW = 130;
      const photoH = 150;

      // Draw photo frame shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(photoX + 4, photoY + 4, photoW, photoH);

      // Draw actual photo frame
      ctx.strokeStyle = "#e5a93c";
      ctx.lineWidth = 3;
      ctx.fillStyle = "#333333"; // Placeholder bg
      ctx.fillRect(photoX, photoY, photoW, photoH);
      ctx.strokeRect(photoX, photoY, photoW, photoH);

      // Draw Member Avatar (Using canvas shapes since standard external URLs might trigger CORS errors)
      drawAvatar(ctx, member.avatar || "avatar1", photoX + 65, photoY + 75);

      // 6. Name Banner
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      // Capitalize name
      const capName = member.name.toUpperCase();
      ctx.fillText(capName, 200, 300);

      // Role Text
      ctx.fillStyle = "#e5a93c";
      ctx.font = "bold 13px Arial";
      ctx.fillText(member.role || "Eco Active Member", 200, 320);

      // Gold Horizontal line 2
      ctx.strokeStyle = "rgba(229, 169, 60, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(80, 335);
      ctx.lineTo(320, 335);
      ctx.stroke();

      // 7. Info Grid Layout
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "12px Arial";

      // Labels
      ctx.fillText("MEMBER ID :", 50, 365);
      ctx.fillText("BLOOD GRP :", 50, 395);
      ctx.fillText("JOIN DATE :", 50, 425);
      ctx.fillText("CONTACT   :", 50, 455);

      // Values
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px Courier New";
      ctx.fillText(member.id, 150, 365);
      
      ctx.font = "bold 13px Arial";
      ctx.fillText(member.bloodGroup || "O+", 150, 395);
      ctx.fillText(member.joinDate || "2026-05-21", 150, 425);
      ctx.fillText(member.phone || "+91 XXXXX XXXXX", 150, 455);

      // 8. Seal / Stamp at bottom right
      ctx.strokeStyle = "rgba(229, 169, 60, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(310, 520, 30, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.fillStyle = "rgba(229, 169, 60, 0.6)";
      ctx.font = "bold 7px Arial";
      ctx.textAlign = "center";
      ctx.fillText("OFFICIAL SEAL", 310, 517);
      ctx.fillText("PRANDHARA", 310, 525);

      // 9. Barcode / QR Code at bottom left
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(50, 495, 120, 45); // white barcode background
      
      // Draw simple fake barcode stripes
      ctx.fillStyle = "#000000";
      let stripeX = 55;
      const stripePatterns = [3, 1, 4, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 1, 4];
      stripePatterns.forEach((width, index) => {
        if (index % 2 === 0) {
          ctx.fillRect(stripeX, 498, width * 1.5, 32);
        }
        stripeX += width * 2;
      });
      // Barcode number text
      ctx.fillStyle = "#000000";
      ctx.font = "7px Arial";
      ctx.textAlign = "center";
      ctx.fillText(member.id, 110, 537);

      // 10. Official Stamp Sign
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.font = "italic 9px Arial";
      ctx.fillText("President Signature", 310, 565);
    }

    // DRAW SHAPE-BASED PREMIUM AVATAR DYNAMICALLY
    function drawAvatar(ctx, avatarType, cx, cy) {
      ctx.save();
      
      // Head / Face
      ctx.fillStyle = "#fcd5b5"; // Skin tone
      ctx.beginPath();
      ctx.arc(cx, cy - 10, 26, 0, Math.PI * 2);
      ctx.fill();

      // Shirt / Shoulders
      if (avatarType === "avatar1") {
        ctx.fillStyle = "#4a90e2"; // Blue shirt
      } else if (avatarType === "avatar2") {
        ctx.fillStyle = "#e25a4a"; // Red shirt
      } else if (avatarType === "avatar3") {
        ctx.fillStyle = "#2c5f2d"; // Green shirt
      } else {
        ctx.fillStyle = "#e5a93c"; // Gold shirt
      }
      ctx.beginPath();
      ctx.moveTo(cx - 40, cy + 45);
      ctx.lineTo(cx + 40, cy + 45);
      ctx.lineTo(cx + 25, cy + 18);
      ctx.lineTo(cx - 25, cy + 18);
      ctx.closePath();
      ctx.fill();

      // Collar neck
      ctx.fillStyle = "#e5b595";
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy + 18);
      ctx.lineTo(cx + 10, cy + 18);
      ctx.lineTo(cx, cy + 28);
      ctx.closePath();
      ctx.fill();

      // Hair
      ctx.fillStyle = "#222222"; // Black hair
      if (avatarType === "avatar2" || avatarType === "avatar4") {
        // Female Avatar long hair
        ctx.beginPath();
        ctx.arc(cx, cy - 14, 28, Math.PI, 0); // top arc
        ctx.fill();
        ctx.fillRect(cx - 28, cy - 14, 10, 45); // left locks
        ctx.fillRect(cx + 18, cy - 14, 10, 45); // right locks
      } else {
        // Male Avatar short spikey hair
        ctx.beginPath();
        ctx.arc(cx, cy - 14, 27, Math.PI * 1.1, Math.PI * 1.9);
        ctx.fill();
        // spike circles
        ctx.beginPath();
        ctx.arc(cx - 10, cy - 36, 8, 0, Math.PI * 2);
        ctx.arc(cx, cy - 39, 9, 0, Math.PI * 2);
        ctx.arc(cx + 10, cy - 36, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Glasses (premium detail for avatar1)
      if (avatarType === "avatar1") {
        ctx.strokeStyle = "#444";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx - 10, cy - 10, 8, 0, Math.PI * 2);
        ctx.arc(cx + 10, cy - 10, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - 2, cy - 10);
        ctx.lineTo(cx + 2, cy - 10);
        ctx.stroke();
      }

      // Smile
      ctx.strokeStyle = "#c68b60";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cy - 5, 8, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.stroke();

      // Glowing Eyes
      ctx.fillStyle = "#333333";
      ctx.beginPath();
      ctx.arc(cx - 10, cy - 12, 2.5, 0, Math.PI * 2);
      ctx.arc(cx + 10, cy - 12, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // DOWNLOAD ID CARD FUNCTION
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        if (!currentMemberData) {
          alert("No member card loaded!");
          return;
        }

        const dataUrl = idCardCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `Prandhara_Member_${currentMemberData.id}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }

    // 3D CARD HOVER TILT INTERACTIVE MICRO-ANIMATION
    if (cardPreviewWrap) {
      cardPreviewWrap.addEventListener("mousemove", (e) => {
        const card = cardPreviewWrap.querySelector(".canvas-card-wrap") || idCardCanvas;
        const rect = cardPreviewWrap.getBoundingClientRect();
        const x = e.clientX - rect.left; //x position within the element.
        const y = e.clientY - rect.top;  //y position within the element.
        
        const midX = rect.width / 2;
        const midY = rect.height / 2;
        
        const rotX = ((y - midY) / midY) * 15; // rotate up to 15 degrees
        const rotY = -((x - midX) / midX) * 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
        card.style.boxShadow = `${-rotY * 1.5}px ${rotX * 1.5}px 30px rgba(0, 0, 0, 0.4)`;
      });

      cardPreviewWrap.addEventListener("mouseleave", () => {
        const card = cardPreviewWrap.querySelector(".canvas-card-wrap") || idCardCanvas;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        card.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.3)`;
        card.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";
      });
      
      cardPreviewWrap.addEventListener("mouseenter", () => {
        const card = cardPreviewWrap.querySelector(".canvas-card-wrap") || idCardCanvas;
        card.style.transition = "none";
      });
    }
  }

  // 6. DONORS PAGE SEARCH FILTER (donors.html)
  const donorSearch = document.getElementById("donorSearch");
  if (donorSearch) {
    donorSearch.addEventListener("input", function() {
      const query = this.value.toLowerCase().trim();
      const rows = document.querySelectorAll(".donor-table tbody tr");
      let count = 0;
      
      rows.forEach(row => {
        const name = row.querySelector(".donor-name").textContent.toLowerCase();
        const city = row.querySelector(".donor-city").textContent.toLowerCase();
        const type = row.querySelector(".donor-type").textContent.toLowerCase();
        
        if (name.includes(query) || city.includes(query) || type.includes(query)) {
          row.style.display = "";
          count++;
        } else {
          row.style.display = "none";
        }
      });
      
      const noResults = document.getElementById("noDonorResults");
      if (noResults) {
        noResults.style.display = count === 0 ? "block" : "none";
      }
    });
  }
});
