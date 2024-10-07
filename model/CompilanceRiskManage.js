const mongoose = require('mongoose');

// Schema for HR Compliance
const ComplianceRiskManagementSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  hrCompliance: {
    laborLawCompliance: {
      type: Boolean,
      required: true,
      default: true,
      description: 'Whether the employee and company adhere to labor laws and regulations'
    },
    lastComplianceCheck: {
      type: Date,
      default: Date.now,
      description: 'The date of the last HR compliance check'
    },
    complianceNotes: {
      type: String,
      description: 'Additional notes related to compliance checks'
    }
  },
  policyManagement: {
    policies: [{
      policyName: {
        type: String,
        required: true
      },
      policyDocument: {
        type: String, // URL or reference to a document storage system
        required: true
      },
      dateDistributed: {
        type: Date,
        required: true
      },
      dateAcknowledged: {
        type: Date,
        required: true
      },
      acknowledged: {
        type: Boolean,
        default: false,
        description: 'Whether the employee has acknowledged the policy'
      }
    }],
    policyNotes: {
      type: String,
      description: 'Additional notes on policy management and distribution'
    }
  },
  auditTrails: {
    actions: [{
      actionType: {
        type: String,
        required: true,
        enum: ['CREATE', 'UPDATE', 'DELETE', 'READ'],
        description: 'Type of action taken on records'
      },
      performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
        description: 'The employee who performed the action'
      },
      actionDescription: {
        type: String,
        required: true,
        description: 'Description of the action performed'
      },
      actionDate: {
        type: Date,
        default: Date.now,
        description: 'Date and time the action was performed'
      }
    }]
  },
  reports: [{
    reportType: {
      type: String,
      required: true,
      enum: ['Compliance', 'Audit', 'Policy'],
      description: 'Type of report generated'
    },
    reportDate: {
      type: Date,
      default: Date.now
    },
    reportFile: {
      type: String, // URL or reference to a document storage system
      required: true,
      description: 'Link or file path to the generated report'
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('ComplianceRiskManagement', ComplianceRiskManagementSchema);
