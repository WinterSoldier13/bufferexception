var moongoose = require('mongoose');
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var userSchema = new moongoose.Schema(
    {
        name:
        {
            type: String,
            required: true,
            maxlength:50,
            trim: true
        },

        username:
        {
            type: String,
            required:true,
            maxlength:18,
            trim: true,
            unique:true
        },

        email:
        {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        instituteName:
        {
            type: String,
            required: true,
            trim: true
        },

        posts:
        {
            type: Array,
            default: []
        },

        level:
        {
            type: Number,
            default: 0
        },

        encryPassword:
        {
            type: String
        },
        salt:
        {
            type:String
        }
        // TODO: ADD A PROFILE PIC

    },
    {timestamps: true}
)

userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encryPassword = this.securePassword(password);
  })
  .get(function()
   {
    return this._password;
  });


userSchema.methods = {
    autheticate: function(plainpassword)
     {
      return this.securePassword(plainpassword) === this.encryPassword;
    },
  
    securePassword: function(plainpassword)
     {
      if (!plainpassword) 
      {
          return "";
      }
      try 
      {
        return crypto
          .createHmac("sha256", this.salt)
          .update(plainpassword)
          .digest("hex");
      }
       catch (err)
        {
        return "";
         }
    }
  };



module.exports = moongoose.model("User", userSchema);