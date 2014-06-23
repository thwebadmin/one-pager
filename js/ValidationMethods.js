$(function(){
//Script that will trim all text box values
	
	var snakeCasesText = $(".convertSnakeCaseToTitleCase");
	snakeCasesText.each(function(){
		$(this).text(convertSnakeCaseToTitleCase($(this).text()));
		
	});
	//$(".convertSnakeCaseToTitleCase").text(convertSnakeCaseToTitleCase($(".convertSnakeCaseToTitleCase").text()));
	$("form").submit(function(){
		$(this).find('input:text').each(function(){
			$(this).val($.trim($(this).val()));
		});
		
	});
	

	
	$.validator.addClassRules({
		amount : {
			amount : true
		},
		numberOnly : {
			digits:true
		},
		isExist : {
			isExist:true
		},
		panCard : {
			required : true,
			//minlength : 2,
			panCard : /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/,
		},
		textOnly : {
			//required : true,
			textOnly : "^[a-zA-Z ]+$",
			//minlength : 2
		},
		comment : {
			textOnly : "^[a-zA-Z .,\n]+$",
		},
		description: {
			textOnly : "^[a-zA-Z0-9 .,\n]+$"
		},
		aadharCardEmpty:{
			notAdded:".adharCard"
		},
		phoneNumber : {
			required : true,
			digits : true,
			minlength : 10,
			maxlength : 10
		},
		validDate : {
			required : true,
			checkdob : "-18"
		},
		requiredField : {
			required : true
		},
		adharCard : {
			digits : true,
			minlength : 12,
			maxlength : 12
		},
		shopAct : {
			required : true,
			shopAct : /^([a-zA-Z]|[a-zA-Z]\s[a-zA-Z])*\/\d{4}$/
		},
		tanCard : {
			required : true,
			tanCard : /^([a-zA-Z]{4})(\d{5})([a-zA-Z]{1})$/,
			minlength : 10,
			maxlength : 10
		},
		zipCode : {
			required : true,
			digits : true,
			minlength : 6,
			maxlength : 6
		},
		/*stdCode : {
			//required : true,
			digits : true,
			minlength : 3,
			maxlength : 5
		},*/
		landlineNumber : {			
			landlineNumber :/^([0-9]{3,4}[\-]{1}[0-9]{6,8})$/
		},
		passwordField : {
			required : true,
			minlength : 8
		},
		imageFileUpload : {
			extension : "jpg|jpeg|png|gif|svg|img",
			filesize : 1048576
		},
		docFileUpload : {
			extension : "jpg|jpeg|png|gif|svg|img|pdf",
			filesize : 1048576
		},
		rePanCard:{
			equalPancard:".panCard"
		},
		primaryEmail : {
			notEqual:".alternateEmail"
		},
		reEmail : {
			equalEmail:".primaryEmail"
		},
		reMobile : {
			equalMobile : ".phoneNumber"
		},
		alternateEmail : {
			notEqual:".primaryEmail"
		},
		securityQuestion1 : {
			equalToIgnoreCase:".securityQuestion2"
		},
		securityQuestion2 : {
			equalToIgnoreCase:".securityQuestion1"
		},
		websiteUrl : {
			url : true 
		},
		percentage : {
			//digits : true,
			required : true,
			percentage : true
		},
		confirmPassword:{
			equal:".newPassword"
		},
		passwordNew:{
			
			passwordNew:/^(?=.*\d+)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,30}$/
		},
		alphaNumeric : {
			alphaNumeric:true
		},
		textarea : {
			maxlength : 250
		},
		otherEmail : {
			notEqualRefEmail:".myEmail"
		},
		isExist2 : {
			isExist2 : true
		},
		offerReferenceExists : {
			offerReferenceExists : true
		},
		checkBoxValidation : {
			checkBoxValidation : true
		}
	});
	/*
	 * jQuery.validator.addMethod("pancard", function(value, element){ var re =
	 * new RegExp("[A-Z][A-Z][A-Z][A-Z][A-Z][0-9][0-9][0-9][0-9][A-Z]"); return
	 * re.test(value); }, "Please enter a valid PAN Card");
	 */
$.validator.addMethod("amount", function(value, element, param){
		
	if(!amountValidation(value)) return false;
    else return true;
	}, "Please enter a Valid Amount");
	
	
	$.validator.addMethod("validdate", function(value, element, param){
		
		var validDate = new Date(value);
		return !(validDate.toString() == "Invalid Date");    
		
	}, "Please enter a Valid date");
	
	$.validator.addMethod("checkdob", function(value, element, param){
		
	  var valDate = new Date(value);
	  var offset = parseInt(param);
	  var validDate = new Date();
	  validDate.setFullYear(validDate.getFullYear() + offset);
	  return (valDate < validDate);
		
	}, "You must be at least 18 years old");
	
	$.validator.addMethod("textOnly",function(value,element,regexp){
		
        var re= new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },"Please enter only characters");
	
	$.validator.addMethod("passwordNew",function(value,element,regexp){
		
        var re= new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },"Password must be 8 characters long and should contain atleast one digit and one character");

	
	$.validator.addMethod("filesize", function(value, element, param) {
	    return this.optional(element) || (element.files[0].size <= param) ;
	}, "File size too large");
	
	$.validator.addMethod("notAdded", function(value, element, param) {
		  return this.optional(element) || ($(param).val()!=="" && value != "");
		}, "Provide aadhar card number");
	
	$.validator.addMethod("notEqual", function(value, element, param) {
		  return this.optional(element) || value != $(param).val();
		}, "Please specify a different email id");
	
	$.validator.addMethod("notEqualRefEmail", function(value, element, param) {
		  return this.optional(element) || value != $(param).val();
		}, "Email Id cannot be same as Primary Email Id");
	
	$.validator.addMethod("equalToIgnoreCase", function (value, element, param) {
        return this.optional(element) || 
             (value.toLowerCase() != $(param).val().toLowerCase());
        },"Please specify a different question");
	
	$.validator.addMethod("notEqualSecQue", function(value, element, param) {
		  return this.optional(element) || value != $(param).val();
		}, "Please specify a different security question");
	
	$.validator.addMethod("checkBoxValidation", function(value, elem, param) {
	    if($(".checkBoxValidation:checkbox:checked").length > 0){
	       return true;
	   }else {
	       return false;
	   }
	},"Select atleast one module");
	
	$.validator.addMethod("equalEmail", function(value, element, param) {
		return this.optional(element) || value == $(param).val();
		}, "Mismatch of Primary and Re-enter Email ID. Please enter correct Email IDs");
	
	$.validator.addMethod("equalPancard", function(value, element, param) {
		return this.optional(element) || value.toUpperCase() == $(param).val().toUpperCase();
		}, "Mismatch of PAN Card and Re-enter PAN Card number. Please enter correct PAN Card Number");
	
	$.validator.addMethod("equalMobile", function(value, element, param) {
		return this.optional(element) || value == $(param).val();
		}, "Mismatch of mobile number and Re-enter mobile number. Please enter correct mobile number");
	
	$.validator.addMethod("panCard",function(value,element,regexp){
        var re= new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },"Please enter valid pancard number");
	
	  var response;
	  var currentGOIType;
	  $.validator.addMethod("isExist",function(value, element) {
		        	if(!value) return "Required Field";
		        	var validateUrl = $(".validateUrl").val();
		        	currentGOIType= element.name;
		        	var currentGOIReferenceNumber;
		          	if(currentGOIType=="panCardNumber")
		          		currentGOIReferenceNumber = value.toUpperCase();
		          	else	
		          		currentGOIReferenceNumber= value;
		          	
		          	var dataToSend = new Object;
		            dataToSend.GOIRefAttribute = currentGOIReferenceNumber; 
		            
		            $.ajax({
		                 method: 'GET',
		                 url: validateUrl,
		                 async: false,
		                 data: dataToSend,
		                 success: function(data){
		                	//If username exists, set response to true
		                	 if(data.status == 'EXIST')
		                		 response = false;
		                	 else
		                		 response =  true;
		                	 
			                   
			                }
		            });
		            return response;
		           
		        },function(value,element){
		        	return element.attributes["goi"].value +" already registered.";
		        }
		       
		    );
	  
	  
	  $.validator.addMethod("isExist2",function(value, element) {
      	if(!value) return "Required Field";
      	var validateUrl = $(".validateUrl").val();
      	var existingPan = $(".existingPan").val().toUpperCase();
      	currentGOIType= element.name;
      	var currentGOIReferenceNumber;
        	if(currentGOIType=="goiReferanceNumber")
        		currentGOIReferenceNumber = value.toUpperCase();
        	else	
        		currentGOIReferenceNumber= value;
        	
        	var dataToSend = new Object;
          dataToSend.GOIRefAttribute = currentGOIReferenceNumber; 
          dataToSend.existingPan = existingPan;
          $.ajax({
               method: 'GET',
               url: validateUrl,
               async: false,
               data: dataToSend,
               success: function(data){
              	//If username exists, set response to true
              	 if(data.status == 'EXIST')
              		 response = false;
              	 else
              		 response =  true;
              	 
	                   
	                }
          });
          return response;
          
      },function(value,element){
      	return element.attributes["goi"].value +" already registered.";
      }
     
  );
	   
	  $.validator.addMethod(
		        "emailExists", 
		        function(value, element) {
		        	if(!value) return "Required Field";
		        	var validateEmailUrl = $(".validateEmailUrl").val();
		        	var email = value;
		        	
		          	var dataToSend = new Object;
		            dataToSend.emailId = email; 
		            var emailresponse;	
		            $.ajax({
		                 method: 'GET',
		                 url: validateEmailUrl+"?emailId="+email,
		                 async: false,
		                 success: function(data){
		                	//If username exists, set response to true
		                	 
		                	 if(data.status == 'EXIST')
		                		 emailresponse = false;
		                	 else
		                		 emailresponse =  true;
		                	 
		                	 
			                }
		            });
		            return emailresponse;
		           
		        },function(value,element){
		        	return "Email already registered.";
		        }
		        );
	  var offerReferenceResponse;
	  $.validator.addMethod(
			  "offerReferenceExists",
			  function(value, element){
		  if(!value) return "Required Field";
		  var validateOfferUrl = $(".validateOfferUrl").val();
		  var offerRef = value;
		  
		  var dataToSend = new Object;
		  dataToSend.offerRef = offerRef;
		  $.ajax({
              method: 'GET',
              url: validateOfferUrl,
              async: false,
              data: dataToSend,
              success: function(data){
             	//If username exists, set response to true
             	 if(data.status == 'EXIST')
             		offerReferenceResponse = false;
             	 else
             		offerReferenceResponse =  true;
	                }
         });
		  return offerReferenceResponse;
      },function(value,element){
      	return "Offer Reference Already Used.";
      }
		  );
	  
	  
	  var mobileresponse;
	  $.validator.addMethod(
		        "mobileExists", 
		        function(value, element) {
		        	if(!value) return "Required Field";
		        	var validateMobileUrl = $(".validateMobileUrl").val();
		        	var phoneNo = value;
		        	
		          	var dataToSend = new Object;
		            dataToSend.phoneNo = phoneNo; 
		            
		            $.ajax({
		                 method: 'GET',
		                 url: validateMobileUrl,
		                 async: false,
		                 data: dataToSend,
		                 success: function(data){
		                	//If username exists, set response to true
		                	 if(data.status == 'EXIST')
		                		 mobileresponse = false;
		                	 else
		                		 mobileresponse =  true;
		                	 
		                	
			                }
		            });
		            return mobileresponse;
		        },function(value,element){
		        	return "Phone number already registered.";
		        }
		       
		    );
	  var userNameResponse;
	  $.validator.addMethod(
		        "preferredUserNameExists", 
		        function(value, element) {
		        	if(!value) return "Required Field";
		        	var validatePreferredUserNameUrl = $(".validatePreferredUserNameUrl").val();
		        	var userName = value;
		        	
		          	var dataToSend = new Object;
		            dataToSend.userName = userName; 
		            
		            $.ajax({
		                 method: 'GET',
		                 url: validatePreferredUserNameUrl,
		                 async: false,
		                 data: dataToSend,
		                 success: function(data){
		                	//If username exists, set response to true
		                	 if(data.status == 'EXIST')
		                		 userNameResponse = false;
		                	 else
		                		 userNameResponse =  true;
		                	
			                }
		            });
		            return userNameResponse;
		        },function(value,element){
		        	return "Username already registered.";
		        }
		       
		    );
	  
	  
	$.validator.addMethod("tanCard",function(value,element,regexp){
        var re= new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },"Please enter valid tan card number");
	
	$.validator.addMethod("url_valid",function(value,element,regexp){
        var re= new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },"Please enter valid url");
	
	$.validator.addMethod("adharCard",function(value,element,regexp){
        var re= new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },"Please enter valid adhar card number");
	
	
	$.validator.addMethod("phoneNumber",function(value,element,regexp){
        var re= new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },"Please enter valid landline number");
	
	$.validator.addMethod("landlineNumber",function(value,element,regexp){
        var re= new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },"Please enter valid landline number");
	
	$.validator.addMethod("shopAct",function(value,element,regexp){
        var re= new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },"Please enter valid shop act number");
	
	$.validator.addMethod("percentage",function(value,element,regexp){
      if(!percentageValidation(value)) return false;
      else return true;
    },"Please enter percentage in numeric");
	$.validator.addMethod("alphaNumeric",function(value,element,regexp){
	      if(!alphaNumericValidation(value)) return false;
	      else return true;
	},"Please enter alpha numeric value");
	
});
jQuery.extend(jQuery.validator.messages, {
    required: "Required field"
});
function amountValidation(x){
	var parts = x.split(".");
	var re= new RegExp(/^[0-9]*\.[0-9][0-9]|[0-9]*$/);
    //var pattern = /^[0-9]*\.[0-9][0-9]|[0-9]*$/;
    if (typeof parts[1] == "string" && (parts[1].length == 0 || parts[1].length > 2 ))
        return false;
    
    var n = parseFloat(x);
    if (isNaN(n))
        return false;
    
    if(!re.test(x))
    	return false;
    return true;
}

function percentageValidation(x) {
    var parts = x.split(".");
    
    var pattern = /^\d{1,3}\.[0-9][0-9]|[0-9]$/;
    if (typeof parts[1] == "string" && (parts[1].length == 0 || parts[1].length > 2 ))
        return false;
    
    var n = parseFloat(x);
    if (isNaN(n))
        return false;
    if (n < 0 || n > 100)
        return false;
    if(!pattern.test(x))
    	return false;
    return true;
}

function mandatoryValidation(value)
{
	if (!value) return false;
	return true;
}

function textOnlyValidation(value)
{
	
	var re = new RegExp("^[a-zA-Z ]+$");
	if (!re.test(value)) return false;
	return true;
} 
function minLengthValidation(value, minLength)
{
		if (value.length < minLength) return false;
		return true;
}

function maxLengthValidation(value, maxLength)
{
	if (value.length > maxLength) return false;
	return true;

}
function numberOnlyValidation(value)
{
	var re = new RegExp("^[0-9]+$");
	if (!re.test(value)) return false;
	return true;
}

function landlineNumberOnlyValidation(value)
{
	var re = new RegExp("^([0-9]{3,4}[\-]{1}[0-9]{6,8})$");
	if (!re.test(value)) return false;
	return true;
}



function emailValidation(value){        
	   var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
	   return emailPattern.test(value);   
	 }   

function ValidUrlValidation(value) {
	  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	  if(!pattern.test(value)) {
	   
	    return false;
	  } else {
	    return true;
	  }
	}
function alphaNumericValidation(value){
	var alphaNumericPattern = /^[A-Za-z0-9]+([-_.+!*]+[A-Za-z0-9]+)*$/;  
	//var alphaNumericPattern = /^[a-zA-Z]*|[0-9]*|[a-zA-Z0-9]$/;  
	   return alphaNumericPattern.test(value);   
}

	
