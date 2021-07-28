public class payslip {
    String payPeriod;
    int incomeTax;
    int netIncome;
    int superAmount;
    int grossIncome;

    public void setGrossIncome(int annualSalary) {
        grossIncome = annualSalary/12;
    }

    public void setIncomeTax(int grossIncome) {
        if(grossIncome>=18201 && grossIncome<=37000)
        {
            double tempGross = (grossIncome-18200)*0.19;
            incomeTax = (int) tempGross;
        }
        if(grossIncome>=37001 && grossIncome<=87000)
        {
            double tempGross = (grossIncome-37000)*0.325;
            incomeTax = (int) tempGross+3572;
        }
        if(grossIncome>=87001 && grossIncome<=180000)
        {
            double tempGross = (grossIncome-87000)*0.37;
            incomeTax = (int) tempGross+19822;
        }
        if(grossIncome>=180001)
        {
            double tempGross = (grossIncome-180000)*0.45;
            incomeTax = (int) tempGross+54232;
        }
     
    }

    public void setNetIncome(int grossIncome, int incomeTax) {
        netIncome = grossIncome-incomeTax;
      
    }

    public void setSuperAmount(double superRate, int grossIncome) {
        superRate = superRate / 100;
        double tempAmount = superRate * grossIncome;
        superAmount = (int) tempAmount;
  
    }

    public void setPayPeriod(String payPeriod) {
        this.payPeriod = payPeriod;
    }

    public int getGrossIncome() {
        return grossIncome;
    }

    public int getIncomeTax() {
        return incomeTax;
    }

    public int getNetIncome() {
        return netIncome;
    }

    public String getPayPeriod() {
        return payPeriod;
    }

    public int getSuperAmount() {
        return superAmount;
    }

    public void displayPayslip()
    {
       
        System.out.println("Pay Period: " + payPeriod);
        System.out.println("Gross Income: " + grossIncome);
        System.out.println("Income Tax: " + incomeTax);
        System.out.println("Net Income: " + netIncome);
        System.out.println("Super Amount: " + superAmount);
    }

    public String toString()
    {
        return payPeriod + grossIncome + incomeTax + netIncome + superAmount;
    }
}
