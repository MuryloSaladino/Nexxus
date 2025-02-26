import Header from "@/components/Header";
import InvestmentBenefitProportionGraph from "./components/InvestmentBenefitProportionGraph";
import InvestmentBenefitSummaryGraph from "./components/InvestmentBenefitSummaryGraph";
import DepartmentTotalSolutionsGraph from "./components/DepartmentTotalSolutionsGraph";
import GeneralStatusGraph from "./components/GeneralStatusGraph";
import styles from "./styles.module.css"
import Text from "@/components/Text";

export default function Dashboard() {

    return(
        <>
            <Header/>

            <div className={`${styles.container} grid-container`}>
                <div className={`${styles.flex} sm-gi-12 md-gi-6 lg-gi-6`}>
                    <Text fontSize="xl">Investment Benefit Proportion By Category</Text>
                    <InvestmentBenefitProportionGraph/>
                </div>
                <div className={`${styles.flex} sm-gi-12 md-gi-6 lg-gi-6`}>
                    <Text fontSize="xl">Investment / Benefit Summary</Text>
                    <InvestmentBenefitSummaryGraph/>
                </div>
                <div className={`${styles.flex} sm-gi-12 md-gi-6 lg-gi-6`}>
                    <Text fontSize="xl">Solutions By Department</Text>
                    <DepartmentTotalSolutionsGraph/>
                </div>
                <div className={`${styles.flex} sm-gi-12 md-gi-6 lg-gi-6`}>
                    <Text fontSize="xl">Solutions Count By Status</Text>
                    <GeneralStatusGraph/>
                </div>
            </div>
        </>
    )
}