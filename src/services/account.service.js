import Account from "../models/account.model.js";
import BVN from "../models/bvn.model.js";
import NIN from "../models/nin.model.js";

// generate account number
const generateAccountNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

// find unique account number
const createUniqueAccountNumber = async () => {
    let accountNumber;
    let exists = true;

    while (exists) {
        accountNumber = generateAccountNumber();
        exists = await Account.findOne({ accountNumber });
    }

    return accountNumber;
};

export const createAccount = async (data, fintech) => {
    const { kycType, kycID, dob } = data;

    // check if BVN or NIN exists
    let identity;

    if (kycType.toLowerCase() === "bvn") {
        identity = await BVN.findOne({ bvn: kycID });
    } else if (kycType.toLowerCase() === "nin") {
        identity = await NIN.findOne({ nin: kycID });
    } else {
        return { error: "Invalid kycType. Use BVN or NIN" };
    }

    if (!identity) {
        return { error: "Identity not found" };
    }

    // check DOB match
    if (identity.dob !== dob) {
        return { error: "DOB does not match identity record" };
    }

    // prevent duplicate account
    const existing = await Account.findOne({
        $or: [{ bvn: kycID }, { nin: kycID }]
    });

    if (existing) {
        return { error: "Account already exists for this identity" };
    }

    // generate account number
    const accountNumber = await createUniqueAccountNumber();

    const account = await Account.create({
        accountNumber,
        accountName: `${identity.firstName} ${identity.lastName}`,
        bvn: kycType.toLowerCase() === "bvn" ? kycID : null,
        nin: kycType.toLowerCase() === "nin" ? kycID : null,
        dob,
        bankCode: fintech.bankCode,
        bankName: fintech.bankName,
        balance: 15000
    });

    return {
        message: "Account created successfully",
        accountNumber: account.accountNumber,
        bankCode: account.bankCode,
        bankName: account.bankName,
        balance: account.balance
    };
};