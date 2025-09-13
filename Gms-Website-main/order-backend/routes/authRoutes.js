const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Import all models at the top (only once)
const Executive = require("../models/Executive");
const Admin = require("../models/Admin");
const Designer = require("../models/Designer");
const Account = require("../models/Account");
const ServiceExecutive = require("../models/ServiceExecutive");
const ServiceManager = require("../models/ServiceManager");
const SalesManager = require("../models/SalesManager");
const ItTeam = require("../models/ITTeam");
const DigitalMarketing = require("../models/DigitalMarketing");
const ClientService = require("../models/ClientService");
const Vendor = require("../models/Vendor");
const Order = require("../models/Order"); // Added for executive-dashboard-data
const Unit = require("../models/Unit");

// ✅ Login route for Executive, Admin, Designer, Account,Service
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const serviceExecutive = await ServiceExecutive.findOne({
      name: new RegExp(`^${name.trim()}$`, "i"),
      password: password.trim(),
    });
    if (serviceExecutive) {
      return res.json({
        success: true,
        role: "Service Executive",
        name: serviceExecutive.name,
      });
    }
    // Check IT Team
   // In your authRoutes.js, add this with other role checks
const itStaff = await ItTeam.findOne({
  $or: [
    { name: new RegExp(`^${name.trim()}$`, "i") },
    { username: new RegExp(`^${name.trim()}$`, "i") }
  ],
  password: password.trim()
});

if (itStaff) {
  return res.json({
    success: true,
    role: "IT",  // Make sure this matches exactly what you'll check in frontend
    name: itStaff.name,
    // Include any other fields you need
  });
}
    // Add this with your other model checks in the login route
    const salesManager = await SalesManager.findOne({
      name: new RegExp(`^${name.trim()}$`, "i"),
      password: password.trim(),
    });
    if (salesManager) {
      return res.json({
        success: true,
        role: "Sales Manager",  // Note: Consistent capitalization matters!
        name: salesManager.name,
      });
    }
    // Check Service Manager
    const serviceManager = await ServiceManager.findOne({
      name: new RegExp(`^${name.trim()}$`, "i"),
      password: password.trim(),
    });
    if (serviceManager) {
      return res.json({
        success: true,
        role: "Service Manager",  // Consistent capitalization
        name: serviceManager.name,
      });
    }
    // Check Digital Marketing
    const digitalMarketing = await DigitalMarketing.findOne({
      name: new RegExp(`^${name.trim()}$`, "i"),
      password: password.trim(),
    });
    if (digitalMarketing) {
      return res.json({
        success: true,
        role: "Digital Marketing",
        name: digitalMarketing.name,
      });
    }

    // Client service
    const clientService = await ClientService.findOne({
      name: new RegExp(`^${name.trim()}$`, "i"),
      password: password.trim(),
    });
    if (clientService) {
      return res.json({
        success: true,
        role: "Client service",
        name: clientService.name,
      });
    }

    // Check Executive
    const executive = await Executive.findOne({
      name: new RegExp(`^${name.trim()}$`, "i"),
      password: password.trim(),
    });
    if (executive) {
      return res.json({
        success: true,
        role: "Executive",
        name: executive.name,
      });
    }

    // Check Admin
    const admin = await Admin.findOne({
      name: new RegExp(`^${name.trim()}$`, "i"),
      password: password.trim(),
    });
    if (admin) {
      return res.json({ success: true, role: "Admin", name: admin.name });
    }

    // Check Designer
    const designer = await Designer.findOne({
      name: new RegExp(`^${name.trim()}$`, "i"),
      password: password.trim(),
    });
    if (designer) {
      return res.json({ success: true, role: "Designer", name: designer.name });
    }
    // Check Vendor
    const vendor = await Vendor.findOne({
      name: new RegExp(`^${name.trim()}$`, "i"),
      password: password.trim(),
    });
    if (vendor) {
      return res.json({
        success: true,
        role: "Vendor",
        name: vendor.name
      });
    }
    // Check Account
    const account = await Account.findOne({
      name: new RegExp(`^${name.trim()}$`, "i"),
      password: password.trim(),
    });
    if (account) {
      return res.json({ success: true, role: "Account", name: account.name });
    }

    return res
      .status(401)
      .json({ success: false, message: "Name or Password is Incorrect" });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ✅ Route to add an Executive (with username)
router.post("/add-executive", async (req, res) => {
  const { username, name, password, phone, email,
    guardianName,
    aadhar,
    joiningDate,
    experience, } = req.body;

  try {
    // Check if executive exists by username OR name
    const existing = await Executive.findOne({
      $or: [{ username }, { name }],
    });
    if (existing) {
      return res.status(400).json({
        error:
          existing.username === username
            ? "Username already exists"
            : "Name already exists",
      });
    }

    const newExecutive = new Executive({
      username, name, password, phone, email,
      guardianName,
      aadhar,
      joiningDate,
      experience
    });
    await newExecutive.save();
    res.status(201).json({ message: "Executive added successfully" });
  } catch (err) {
    console.error("Error saving executive:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Route to add an Admin (with username)
router.post("/add-admin", async (req, res) => {
  const { username, name, password, phone, email,
    guardianName,
    aadhar,
    joiningDate,
    experience, } = req.body;

  try {
    const existing = await Admin.findOne({
      $or: [{ username }, { name }],
    });
    if (existing) {
      return res.status(400).json({
        error:
          existing.username === username
            ? "Username already exists"
            : "Name already exists",
      });
    }

    const newAdmin = new Admin({
      username, name, password, phone, email,
      guardianName,
      aadhar,
      joiningDate,
      experience
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin added successfully" });
  } catch (err) {
    console.error("Error saving admin:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Route to add a Designer (with username)
router.post("/add-designer", async (req, res) => {
  const { username, name, password, phone, email,
    guardianName,
    aadhar,
    joiningDate,
    experience } = req.body;

  try {
    const existing = await Designer.findOne({
      $or: [{ username }, { name }],
    });
    if (existing) {
      return res.status(400).json({
        error:
          existing.username === username
            ? "Username already exists"
            : "Name already exists",
      });
    }

    const newUser = new Designer({
      username, name, password, phone, email,
      guardianName,
      aadhar,
      joiningDate,
      experience
    });
    await newUser.save();
    res.status(201).json({ message: "Designer added successfully" });
  } catch (err) {
    console.error("Error saving designer:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Route to add an Account (with username)
router.post("/add-account", async (req, res) => {
  const { username, name, password, phone, email,
    guardianName,
    aadhar,
    joiningDate,
    experience } = req.body;

  try {
    const existing = await Account.findOne({
      $or: [{ username }, { name }],
    });
    if (existing) {
      return res.status(400).json({
        error:
          existing.username === username
            ? "Username already exists"
            : "Name already exists",
      });
    }

    const newUser = new Account({
      username, name, password, phone, email,
      guardianName,
      aadhar,
      joiningDate,
      experience
    });
    await newUser.save();
    res.status(201).json({ message: "Account user added successfully" });
  } catch (err) {
    console.error("Error saving account user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Route to add Service Executive (with username)
router.post("/add-service-executive", async (req, res) => {
  const { username, name, password, phone, email,
    guardianName,
    aadhar,
    joiningDate,
    experience } = req.body;

  try {
    const existing = await ServiceExecutive.findOne({
      $or: [{ username }, { name }],
    });
    if (existing) {
      return res.status(400).json({
        error:
          existing.username === username
            ? "Username already exists"
            : "Name already exists",
      });
    }

    const newUser = new ServiceExecutive({
      username, name, password, phone, email,
      guardianName,
      aadhar,
      joiningDate,
      experience
    });
    await newUser.save();
    res.status(201).json({ message: "Service Executive added successfully" });
  } catch (err) {
    console.error("Error saving Service Executive:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Route to add Service Manager (with username)
router.post("/add-service-manager", async (req, res) => {
  const { username, name, password, phone, email,
    guardianName,
    aadhar,
    joiningDate,
    experience } = req.body;

  try {
    const existing = await ServiceManager.findOne({
      $or: [{ username }, { name }],
    });
    if (existing) {
      return res.status(400).json({
        error:
          existing.username === username
            ? "Username already exists"
            : "Name already exists",
      });
    }

    const newUser = new ServiceManager({
      username, name, password, phone, email,
      guardianName,
      aadhar,
      joiningDate,
      experience
    });
    await newUser.save();
    res.status(201).json({ message: "Service Manager added successfully" });
  } catch (err) {
    console.error("Error saving Service Manager:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Route to add Sales Manager (with username)
router.post("/add-sales-manager", async (req, res) => {
  const { username, name, password, phone, email,
    guardianName,
    aadhar,
    joiningDate,
    experience } = req.body;

  try {
    const existing = await SalesManager.findOne({
      $or: [{ username }, { name }],
    });
    if (existing) {
      return res.status(400).json({
        error:
          existing.username === username
            ? "Username already exists"
            : "Name already exists",
      });
    }

    const newUser = new SalesManager({
      username, name, password, phone, email,
      guardianName,
      aadhar,
      joiningDate,
      experience
    });
    await newUser.save();
    res.status(201).json({ message: "Sales Manager added successfully" });
  } catch (err) {
    console.error("Error saving Sales Manager:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Route to add IT Team (with username)
router.post("/add-it-team", async (req, res) => {
  const {
    username,
    name,
    phone,
    password,
    email,
    guardianName,
    aadhar,
    joiningDate,
    experience,
    active
  } = req.body;

  try {
    const existing = await ItTeam.findOne({
      $or: [{ username }, { name }],
    });
    if (existing) {
      return res.status(400).json({
        error:
          existing.username === username
            ? "Username already exists"
            : "Name already exists",
      });
    }

    const newUser = new ItTeam({
      username,
      name,
      password,
      phone,
      email,
      guardianName,
      aadhar,
      joiningDate,
      experience,
      active: active !== false
    });
    await newUser.save();
    res.status(201).json({ message: "IT Team member added successfully" });
  } catch (err) {
    console.error("Error saving IT Team user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Route to add Digital Marketing (with username)
router.post("/add-digital-marketing", async (req, res) => {
  const { username, name, password, phone, email,
    guardianName,
    aadhar,
    joiningDate,
    experience } = req.body;

  try {
    const existing = await DigitalMarketing.findOne({
      $or: [{ username }, { name }],
    });
    if (existing) {
      return res.status(400).json({
        error:
          existing.username === username
            ? "Username already exists"
            : "Name already exists",
      });
    }

    const newUser = new DigitalMarketing({
      username, name, password, phone, email,
      guardianName,
      aadhar,
      joiningDate,
      experience
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "Digital Marketing user added successfully" });
  } catch (err) {
    console.error("Error saving Digital Marketing user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Route to add a clientservice (fixed version)
router.post("/add-clientservice", async (req, res) => {
  const { username, name, password, phone, email,
    guardianName,
    aadhar,
    joiningDate,
    experience } = req.body;

  try {
    const existing = await ClientService.findOne({
      $or: [{ username }, { name }],
    });
    if (existing) {
      return res.status(400).json({
        error:
          existing.username === username
            ? "Username already exists"
            : "Name already exists",
      });
    }

    const newUser = new ClientService({
      username, name, password, phone, email,
      guardianName,
      aadhar,
      joiningDate,
      experience
    });
    await newUser.save();
    res.status(201).json({ message: "Client Service user added successfully" });
  } catch (err) {
    console.error("Error saving Client Service user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET executive dashboard data
router.get("/executive-dashboard-data", async (req, res) => {
  try {
    const { executiveName, month, year } = req.query;

    if (!executiveName) {
      return res.status(400).json({ error: "Executive name is required" });
    }

    // Build date range if month and year are provided
    let startDate = null;
    let endDate = null;
    if (month && year) {
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 1);
    }

    // Filter orders by executive
    const query = { executive: executiveName };
    if (startDate && endDate) {
      query.date = { $gte: startDate, $lt: endDate };
    }

    const orders = await Order.find(query);

    // Achieved orders
    const achieved = orders.length;

    // Total target (assuming each order is 1 point, or use your own logic)
    const target = 20; // Replace with actual monthly target logic if needed

    // Pending Payments
    const pendingPayments = orders.filter((order) => order.balance > 0).length;

    // Pending Services
    const pendingServices = orders.reduce((count, order) => {
      order.rows.forEach((row) => {
        if (!row.isCompleted) count++;
      });
      return count;
    }, 0);

    res.json({
      executive: executiveName,
      target,
      achieved,
      pendingPayments,
      pendingServices,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});


// Get all employees - improved error handling
router.get("/employees", async (req, res) => {
  try {
    const [
      executives,
      admins,
      designers,
      accounts,
      serviceExecutives,
      serviceManagers,
      salesManagers,
      itTeams,
      digitalMarketings,
      clientServices,
      units   // ✅ here you fetch Unit employees
    ] = await Promise.all([
      Executive.find({}).lean(),
      Admin.find({}).lean(),
      Designer.find({}).lean(),
      Account.find({}).lean(),
      ServiceExecutive.find({}).lean(),
      ServiceManager.find({}).lean(),
      SalesManager.find({}).lean(),
      ItTeam.find({}).lean(),
      DigitalMarketing.find({}).lean(),
      ClientService.find({}).lean(),
      Unit.find({}).lean()
    ]);

    const employeeCategories = {
      Executive: executives,
      Admin: admins,
      Designer: designers,
      Account: accounts,
      ServiceExecutive: serviceExecutives,
      ServiceManager: serviceManagers,
      SalesManager: salesManagers,
      ITTeam: itTeams,
      DigitalMarketing: digitalMarketings,
      ClientService: clientServices,
      Unit: units   // ✅ make sure it’s "units" not "unit"
    };

    res.json(employeeCategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get user profile
router.get("/user-profile", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).send("Name is required");

    const collections = [
      { model: Executive, name: "Executive" },
      { model: Admin, name: "Admin" },
      { model: Designer, name: "Designer" },
      { model: Account, name: "Account" },
      { model: ServiceExecutive, name: "ServiceExecutive" },
      { model: ServiceManager, name: "ServiceManager" },
      { model: SalesManager, name: "SalesManager" },
      { model: ItTeam, name: "ITTeam" },
      { model: DigitalMarketing, name: "DigitalMarketing" },
      { model: ClientService, name: "ClientService" },
    ];

    let user = null;
    let role = "";

    for (const { model, name: roleName } of collections) {
      user = await model.findOne({ name });
      if (user) {
        role = roleName;
        break;
      }
    }

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json({
      name: user.name,
      phone: user.phone,
      active: user.active !== false, // Ensure consistent active status
      role,
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).send("Server error");
  }
});

// Update profile
router.put("/update-profile", async (req, res) => {
  try {
    const { name, updates } = req.body;

    if (!name || !updates) {
      return res.status(400).json({
        success: false,
        message: "Name and updates are required",
      });
    }

    const collections = {
      Executive,
      Admin,
      Designer,
      Account,
      ServiceExecutive,
      ServiceManager,
      SalesManager,
      ItTeam,
      DigitalMarketing,
      ClientService,
    };

    // Find current user
    let currentModel = null;
    let currentUser = null;

    for (const [modelName, Model] of Object.entries(collections)) {
      currentUser = await Model.findOne({ name });
      if (currentUser) {
        currentModel = Model;
        break;
      }
    }

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Handle role change
    if (updates.role && updates.role !== currentModel.modelName) {
      const NewModel = collections[updates.role];
      if (!NewModel) {
        return res.status(400).json({
          success: false,
          message: "Invalid role specified",
        });
      }

      // Check for existing user in new role
      const existingUser = await NewModel.findOne({ name });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists in the new role",
        });
      }

      // Create new user in target collection
      const newUser = new NewModel({
        name: currentUser.name,
        phone: updates.phone || currentUser.phone,
        active: updates.active !== false, // Explicitly set active status
        password: currentUser.password || "defaultPassword",
      });

      await newUser.save();
      await currentModel.deleteOne({ _id: currentUser._id });

      return res.json({
        success: true,
        message: "Profile and role updated successfully",
        data: {
          name: newUser.name,
          phone: newUser.phone,
          active: newUser.active !== false,
          role: updates.role,
        },
      });
    }

    // Regular update
    const updateData = {
      ...updates,
      active: updates.active !== false, // Ensure active is properly set
    };

    const updatedUser = await currentModel.findOneAndUpdate(
      { _id: currentUser._id },
      { $set: updateData },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        name: updatedUser.name,
        phone: updatedUser.phone,
        active: updatedUser.active !== false,
        role: currentModel.modelName,
      },
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during update",
      error: err.message,
    });
  }
});

// Add route to create Unit employees
router.post("/add-unit", async (req, res) => {
  const {
    username,
    name,
    phone,
    password,
    email,
    guardianName,
    aadhar,
    joiningDate,
    experience,
    active
  } = req.body;

  try {
    const existing = await Unit.findOne({
      $or: [{ username }, { name }],
    });
    if (existing) {
      return res.status(400).json({
        error:
          existing.username === username
            ? "Username already exists"
            : "Name already exists",
      });
    }

    const newUnit = new Unit({
      username,
      name,
      password,
      phone,
      email,
      guardianName,
      aadhar,
      joiningDate,
      experience,
      active: active !== false
    });
    await newUnit.save();
    res.status(201).json({ message: "Unit employee added successfully" });
  } catch (err) {
    console.error("Error saving Unit employee:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/units", async (req, res) => {
  try {
    const units = await Unit.find();
    res.json(units);
  } catch (error) {
    console.error("Error fetching units:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
