import React, { useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import FileSaver from "file-saver";
import { Button } from "neetoui";
import { Container } from "neetoui/layouts";

import articlesApi from "apis/articles";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import ProgressBar from "components/Common/ProgressBar";

const DownloadReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const consumer = createConsumer();

  const { mutate: generatePdf } = useMutation(
    async () => {
      await articlesApi.generatePdf();
    },
    {
      onError: error => {
        logger.error(error);
      },
    }
  );

  const { mutate: downloadPdf } = useMutation(
    async () => {
      const { data } = await articlesApi.download();

      return data;
    },
    {
      onSuccess: data => {
        FileSaver.saveAs(data, "scribble_article_report.pdf");
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  useEffect(() => {
    subscribeToReportDownloadChannel({
      consumer,
      setMessage,
      setProgress,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setIsLoading(false);
      setMessage("Report is ready to be downloaded");
    }
  }, [progress]);

  return (
    <Container>
      <div className="mx-auto mt-48 w-3/6 space-y-6 rounded-md border-2 p-4 text-center">
        <h1>{message}</h1>
        <ProgressBar progress={progress} />
        <Button label="Download" loading={isLoading} onClick={downloadPdf} />
      </div>
    </Container>
  );
};

export default DownloadReport;
