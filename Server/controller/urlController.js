import { nanoid } from "nanoid"
import URL from '../model/url.js'
import geoip from 'geoip-lite';
import DeviceDetector from "node-device-detector";

export const urlGenrate = async (req, res) => {
  try {
    const { originalUrl, title, customUrl } = req.body
    if (!title) {
      return res.status(401).json({ success: false, message: "Title is required" })
    }
    if (!originalUrl) {
      return res.status(401).json({ success: false, message: "Url is required" })
    }
    const shortUrlGenrate = nanoid(8)


    const newUrl = new URL({
      shortUrl: shortUrlGenrate,
      redirectUrl: originalUrl,
      title,
      customUrl,
      userId: req.user.id
    })
    await newUrl.save()

    console.log(shortUrlGenrate)
    return res.status(200).json({ success: true, newUrl, message: "Url Genrated Successfully" })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error in Server url controller" })
  }
}
export const handleDelete = async (req, res) => {
  const { id } = req.params;  // Get the URL ID from the route params

  try {
    // Find and delete the URL by its ID
    const deletedUrl = await URL.findByIdAndDelete(id);

    if (!deletedUrl) {
      return res.status(404).json({ success: false, message: "URL not found" });
    }

    // Send success response
    return res.status(200).json({ success: true, message: "URL deleted successfully" });
  } catch (error) {
    console.error("Error deleting URL:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


const detector = new DeviceDetector();
// export const handleRedirect = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find the short URL data
//     const urlData = await URL.findOne({ shortUrl: id });

//     if (!urlData) {
//       return res.status(404).json({
//         success: false,
//         message: "Short URL not found FROM HANDLE REDIRECT",
//       });
//     }

//     // Increment redirect count
//     urlData.redirectCount += 1;

//     // Extract IP address
//     const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

//     // Get geolocation data from IP
//     const geo = geoip.lookup(ip);

//     // Extract User-Agent and determine device type
//     const userAgent = req.headers["user-agent"] || "Unknown";
//     const deviceType = getDeviceType(userAgent);

//     // Add access log to the database
//     urlData.accessLogs.push({
//       ip: ip || "Unknown",
//       location: geo ? `${geo.city}, ${geo.country}` : "Unknown",
//       timestamp: new Date(),

//     });
//     urlData.deviceType.push(deviceType);

//     // Save the updated URL data
//     await urlData.save();

//     // Redirect the user
//     return res.json({
//       success: true,
//       redirectUrl: urlData.redirectUrl,
//     });
//   } catch (error) {
//     console.error("Error in redirect controller:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error in redirect controller",
//     });
//   }
// };


export const handleRedirect = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the short URL data
    const urlData = await URL.findOne({ shortUrl: id });

    if (!urlData) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    // Increment redirect count
    urlData.redirectCount += 1;

    // Extract IP address
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Get geolocation data from IP
    const geo = geoip.lookup(ip);

    // Extract User-Agent and detect device type
    const userAgent = req.headers["user-agent"] || "Unknown";
    const deviceData = detector.detect(userAgent);
    const deviceType = deviceData.device.type || "desktop"; // Default to desktop if type is undefined

    // Update deviceType counts
    if (!urlData.deviceType) {
      urlData.deviceType = { desktop: 0, mobile: 0, tablet: 0 };
    }
    urlData.deviceType[deviceType] = (urlData.deviceType[deviceType] || 0) + 1;

    // Add access log
    urlData.accessLogs.push({
      ip: ip || "Unknown",
      location: geo ? `${geo.city}, ${geo.country}` : "Unknown",
      timestamp: new Date(),
    });

    // Save the updated URL data
    await urlData.save();

    // Redirect the user
    return res.json({
      success: true,
      redirectUrl: urlData.redirectUrl,
    });
  } catch (error) {
    console.error("Error in redirect controller:", error);
    return res.status(500).json({
      success: false,
      message: "Server error in redirect controller",
    });
  }
};








export const fetchAllUrl = async (req, res) => {
  try {
    const userId = req.user.id
    const userUrls = await URL.find({ userId: userId });

    if (!userUrls) {
      return res.status(404).json({ success: false, message: "No URLs found for this user" });
    }
    return res.status(200).json({ success: true, data: userUrls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).json({ success: false, message: "Server error while fetching URLs" });
  }
}

export const urlDetails = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(401).json({ success: false, message: "Invailid Url Id " })
  }
  try {
    const fetchUrl = await URL.findOne({ shortUrl: id })
    if (!fetchUrl) {
      return res.status(404).json({ success: false, message: "URL not found" });
    }
    return res.status(200).json({
      success: true,
      message: "URL details fetched successfully",
      data: fetchUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the URL details",
      error: error.message,
    })
  }
}